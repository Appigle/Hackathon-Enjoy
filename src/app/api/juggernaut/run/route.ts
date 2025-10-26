import { NextRequest, NextResponse } from 'next/server';
import {
  runJuggernautProcess,
  testProcessId,
  testApiKey,
  type JuggernautMetadata
} from '@/src/services/juggernaut';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const processId: string = body.processId || testProcessId;
    if (!processId) {
      return NextResponse.json({ ok: false, error: 'process_id_missing' }, { status: 400 });
    }
    const apiKey = body.apiKey || testApiKey;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: 'api_key_missing' }, { status: 400 });
    }

    const inputs: Record<string, unknown> = body.inputs ?? {};
    const metadata: JuggernautMetadata = {
      name: body.metadata?.name ?? 'Dashboard Trigger',
      description: body.metadata?.description ?? 'Manual run from preview UI',
      notes: body.metadata?.notes
    };

    if (!metadata.name) {
      return NextResponse.json({ ok: false, error: 'metadata_name_required' }, { status: 400 });
    }

    const result = await runJuggernautProcess({
      processId,
      apiKey,
      inputs,
      metadata
    });

    return NextResponse.json({ ok: true, data: { processId, inputs, metadata, ...result } });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message ?? 'run_failed' }, { status: 400 });
  }
}
