import { NextRequest, NextResponse } from "next/server";
import { chatWithTutor } from "@/lib/ai";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { query, subject, history } = body;

    const explanation = await chatWithTutor(query, subject || "General Knowledge", history || []);

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Explanation API Error:", error);
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 });
  }
}
