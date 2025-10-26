import { UrlSchema } from '@/src/services/validators';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // const json=await req.json();
    // const body=UrlSchema.parse(json);
    // const result=await
    return NextResponse.json({ ok: true, data: 'ok' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'invalid_payload' },
      { status: 400 }
    );
  }
}
