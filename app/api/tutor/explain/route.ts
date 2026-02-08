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
    const { query, context } = body;

    const explanation = await explainConcept(query, context);

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Explanation API Error:", error);
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 });
  }
}
