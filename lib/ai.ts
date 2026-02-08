
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { GEMINI_MODELS, GROQ_MODELS } from "./ai-config";

// Initialize clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "dummy_key" }); // Safe fallback for build

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // The correct option string
  explanation: string;
}

export interface QuizGenerationParams {
  topic: string;
  difficulty: string;
  type: string;
  amount: number;
  model?: string;
}

export async function generateQuizWithGemini(params: QuizGenerationParams): Promise<QuizQuestion[]> {
  const modelName = params.model || GEMINI_MODELS.FLASH;
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `
    Generate a quiz about "${params.topic}".
    Difficulty: ${params.difficulty}.
    Question Type: ${params.type}.
    Number of Questions: ${params.amount}.

    Output strictly valid JSON in the following format:
    [
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "explanation": "Brief explanation of why it is correct."
      }
    ]
    Do not include markdown code blocks. Just the raw JSON string.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean up markdown if present
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate quiz with Gemini");
  }
}

export async function generateQuizWithGroq(params: QuizGenerationParams): Promise<QuizQuestion[]> {
  const modelName = params.model || GROQ_MODELS.LLAMA_3_3_70B_VERSATILE;

  const prompt = `
    Generate a quiz about "${params.topic}".
    Difficulty: ${params.difficulty}.
    Question Type: ${params.type}.
    Number of Questions: ${params.amount}.

    Output strictly valid JSON in the following format:
    [
      {
        "question": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "explanation": "Brief explanation of why it is correct."
      }
    ]
    Do not include markdown code blocks or intro text. Just the raw JSON array.
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: modelName,
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content || "[]";
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Groq Generation Error:", error);
    throw new Error("Failed to generate quiz with Groq");
  }
}

export async function explainConcept(concept: string, context?: string, modelProvider: "gemini" | "groq" = "groq"): Promise<string> {
    const prompt = `Explain the concept of "${concept}" simply and clearly. ${context ? `Context: ${context}` : ""} Use an analogy if possible. Keep it concise.`;

    if (modelProvider === "gemini") {
        const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.FLASH });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } else {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: GROQ_MODELS.LLAMA_3_1_8B_INSTANT,
        });
        return completion.choices[0]?.message?.content || "Could not generate explanation.";
    }
}
