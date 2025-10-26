import { NextRequest, NextResponse } from 'next/server';
import { SendTemplateSchema } from '@/src/services/validators';
import { sendEmailTemplate } from '@/src/services/email';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = SendTemplateSchema.parse(json);
    const result = await sendEmailTemplate({
      to: body.to,
      subject: body.subject,
      template: body.template,
      props: body.props
    });
    return NextResponse.json({ ok: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message ?? 'send_failed' }, { status: 400 });
  }
}
