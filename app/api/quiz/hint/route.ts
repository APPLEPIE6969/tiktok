
import { NextRequest, NextResponse } from "next/server";
import { explainConcept } from "@/lib/ai";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { question, context, provider } = body;

    const explanation = await explainConcept(
        `Hint for question: "${question}".`,
        `Context: The correct answer involves ${context || "general knowledge"}. Don't give the answer directly, just a hint.`,
        provider
    );

    return NextResponse.json({ hint: explanation });
  } catch (error) {
    console.error("Hint Generation API Error:", error);
    return NextResponse.json({ error: "Failed to generate hint" }, { status: 500 });
  }
}
