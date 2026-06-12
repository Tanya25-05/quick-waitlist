import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const audienceId = process.env.AUDIENCE_ID;

  if (!audienceId) {
    return NextResponse.json({ count: 0 });
  }

  try {
    const { data, error } = await resend.contacts.list({
      audienceId,
    });

    if (error) {
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: data?.data?.length ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
