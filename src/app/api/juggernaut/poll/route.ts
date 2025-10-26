import { NextRequest, NextResponse } from 'next/server';
import { pollJuggernautProcessEvents, testApiKey } from '@/src/services/juggernaut';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const referenceId: string | undefined = body.referenceId;
    if (!referenceId) {
      return NextResponse.json({ ok: false, error: 'reference_id_missing' }, { status: 400 });
    }
    const apiKey = body.apiKey || testApiKey;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: 'api_key_missing' }, { status: 400 });
    }

    const result = await pollJuggernautProcessEvents({
      referenceId,
      apiKey
    });

    return NextResponse.json({ ok: true, data: { referenceId, ...result } });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message ?? 'poll_failed' }, { status: 400 });
  }
}
