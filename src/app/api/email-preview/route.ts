import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { render } from '@react-email/render';
import FollowUpEmail from '@/emails/FollowUpEmail';
import FollowUpProcessing from '@/emails/FollowUpProcessing';
import NegativeFeedbackApology from '@/emails/NegativeFeedbackApology';
import WelcomeEmail from '@/emails/WelcomeEmail';

const templates = {
  followUp: FollowUpEmail,
  followUpProcessing: FollowUpProcessing,
  apology: NegativeFeedbackApology,
  welcome: WelcomeEmail
} as const;

export async function POST(req: NextRequest) {
  try {
    const { template = 'followUp', props = {} } = await req.json();
    const EmailComponent = templates[template as keyof typeof templates] ?? FollowUpEmail;
    const html = render(React.createElement(EmailComponent, props), { pretty: true });
    return NextResponse.json({ ok: true, html });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? 'preview_render_failed' },
      { status: 400 }
    );
  }
}
