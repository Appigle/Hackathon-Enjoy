import sgMail from '@sendgrid/mail';
import { render } from '@react-email/render';
import FollowUpEmail from '@/emails/FollowUpEmail';

const apiKey = process.env.SENDGRID_API_KEY;
const fromAddress = process.env.EMAIL_FROM || 'PulsePilot <no-reply@example.com>';

import React from 'react';

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

export async function sendFollowUpEmail(opts: {
  to: string;
  subject: string;
  templateProps: React.ComponentProps<typeof FollowUpEmail>;
}) {
  const html = render(React.createElement(FollowUpEmail, opts.templateProps));
  const text = `Hi ${opts.templateProps.greetingName ?? 'there'},\n\n${opts.templateProps.summary}\n\nOpen: ${
    opts.templateProps.ctaUrl
  }`;

  if (!apiKey) {
    console.warn('[email] SENDGRID_API_KEY missing — simulate send');
    return { id: `simulated-${Date.now()}`, simulated: true, html, text };
  }

  const [res] = await sgMail.send({
    to: opts.to,
    from: fromAddress,
    subject: opts.subject,
    html,
    text
  });

  return { id: res.headers['x-message-id'] ?? 'unknown', simulated: false };
}
