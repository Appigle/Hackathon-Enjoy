import { NextRequest, NextResponse } from 'next/server';
import { SurveySchema } from '@/src/services/validators';
import { addResponse } from '@/src/services/analytics';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = SurveySchema.parse(json);
    addResponse(body);
    return NextResponse.json({ ok: true, data: { responseId: `${Date.now()}` } });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message ?? 'invalid_payload' }, { status: 400 });
  }
}
