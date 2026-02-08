import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure this runs on the edge or Node, but for file handling Node is often safer with Next.js depending on config.
// Using standard Node runtime for now.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const audioFile = formData.get("audio") as Blob;
        const history = formData.get("history") ? JSON.parse(formData.get("history") as string) : [];
        const language = formData.get("language") as string || "English";

        if (!audioFile) {
            return NextResponse.json({ error: "No audio provided" }, { status: 400 });
        }

        // Convert Blob to ArrayBuffer then to Base64
        const arrayBuffer = await audioFile.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString("base64");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        // Using the specific model requested
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-preview-native-audio-dialog",
        });

        // Construct the prompt
        // We can add a system instruction or just prepend it to the history
        const systemPrompt = `You are a helpful and friendly AI Tutor. 
    You are speaking with a student in ${language}. 
    Keep your responses concise, encouraging, and focused on helping them learn. 
    Do not be too verbose as this is a voice conversation.`;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                ...history.map((msg: any) => ({
                    role: msg.role === "ai" ? "model" : "user",
                    parts: [{ text: msg.content }],
                })),
            ],
        });

        const result = await chat.sendMessage([
            {
                inlineData: {
                    mimeType: audioFile.type || "audio/webm",
                    data: base64Audio,
                },
            },
        ]);

        const response = await result.response;
        const candidates = response.candidates;
        let text = "";
        let audioData = null;

        if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
            for (const part of candidates[0].content.parts) {
                if (part.text) {
                    text += part.text;
                }
                if (part.inlineData && part.inlineData.mimeType.startsWith("audio/")) {
                    audioData = part.inlineData.data;
                }
            }
        }

        if (!text && !audioData) {
            // Fallback if structure is different or empty
            text = response.text();
        }

        return NextResponse.json({
            text,
            audio: audioData
        });

    } catch (error) {
        console.error("Error in live tutor API:", error);
        return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
    }
}
