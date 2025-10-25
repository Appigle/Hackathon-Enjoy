import { NextRequest, NextResponse } from 'next/server';
import { FollowUpSchema } from '@/src/services/validators';
import { sendFollowUpEmail } from '@/src/services/email';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = FollowUpSchema.parse(json);
    const result = await sendFollowUpEmail({
      to: body.to,
      subject: body.subject,
      templateProps: {
        greetingName: body.payload.greetingName,
        summary: body.payload.summary,
        ctaUrl: body.payload.ctaUrl
      }
    });

    return NextResponse.json({ ok: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message ?? 'send_failed' }, { status: 400 });
  }
}
