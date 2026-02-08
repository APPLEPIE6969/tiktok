import { NextRequest, NextResponse } from "next/server";
import { generateTutorResponse } from "@/lib/chat";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { query, subject, history, language } = body;

    // Convert frontend history to ChatMessage format if needed, 
    // but generateTutorResponse expects standard role/content objects which match.
    // We just need to ensure the types align.

    // Default language to English if not provided (though frontend sends it now)
    const userLanguage = language || "English";

    const response = await generateTutorResponse(
      query,
      history || [],
      subject || "General Knowledge",
      userLanguage
    );

    return NextResponse.json({ explanation: response.text, model: response.model });
  } catch (error) {
    console.error("Explanation API Error:", error);
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 });
  }
}
