import { NextRequest, NextResponse } from "next/server";
import { generateQuiz, AIMode, QuizGenerationParams } from "@/lib/ai";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      topic,
      difficulty,
      type,
      amount,
      language,
      mode,
      customContent,
      instantFeedback
    } = body;

    // Validate mode
    const aiMode: AIMode = ["fast", "balanced", "smart"].includes(mode) ? mode : "balanced";

    const params: QuizGenerationParams = {
      topic,
      difficulty,
      type,
      amount: amount === "recommended" ? "recommended" : parseInt(amount),
      language: language || "English",
      customContent: customContent || undefined,
    };

    // Generate quiz with automatic fallback
    const { questions, usedMode } = await generateQuiz(aiMode, params);

    return NextResponse.json({
      quiz: questions,
      settings: {
        topic,
        difficulty,
        type,
        language,
        instantFeedback: instantFeedback ?? false,
        aiMode: usedMode,
        totalQuestions: questions.length,
      }
    });
  } catch (error) {
    console.error("Quiz Generation API Error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
