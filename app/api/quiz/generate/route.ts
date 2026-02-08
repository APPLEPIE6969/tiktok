
import { NextRequest, NextResponse } from "next/server";
import { generateQuizWithGemini, generateQuizWithGroq, QuizGenerationParams } from "@/lib/ai";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { topic, difficulty, type, amount, provider, model } = body;

    const params: QuizGenerationParams = {
      topic,
      difficulty,
      type,
      amount: parseInt(amount),
      model,
    };

    let quizData;
    if (provider === "groq") {
        quizData = await generateQuizWithGroq(params);
    } else {
        // Default to Gemini
        quizData = await generateQuizWithGemini(params);
    }

    return NextResponse.json({ quiz: quizData });
  } catch (error) {
    console.error("Quiz Generation API Error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
