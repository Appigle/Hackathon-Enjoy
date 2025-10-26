import sgMail from '@sendgrid/mail';
import React, { ComponentType } from 'react';
import { render } from '@react-email/render';
import FollowUpEmail from '@/emails/FollowUpEmail';
import FollowUpProcessing from '@/emails/FollowUpProcessing';
import NegativeFeedbackApology from '@/emails/NegativeFeedbackApology';
import NegativeFeedbackOpsAlert from '@/emails/NegativeFeedbackOpsAlert';
import WelcomeEmail from '@/emails/WelcomeEmail';

const apiKey = process.env.SENDGRID_API_KEY;
const fromAddress = process.env.EMAIL_FROM || 'PulsePilot <no-reply@example.com>';

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

export const templateRegistry = {
  followUp: FollowUpEmail,
  followUpProcessing: FollowUpProcessing,
  apology: NegativeFeedbackApology,
  welcome: WelcomeEmail,
  opsAlert: NegativeFeedbackOpsAlert
} satisfies Record<string, ComponentType<any>>;

export type TemplateId = keyof typeof templateRegistry;

export async function sendEmailTemplate(opts: {
  to: string;
  subject: string;
  template: TemplateId;
  props: Record<string, unknown>;
}) {
  const Component = templateRegistry[opts.template];
  const element = React.createElement(Component, opts.props);
  const html = render(element, { pretty: true });
  const text = `Preview of ${opts.template}`;

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

export async function sendFollowUpEmail(opts: {
  to: string;
  subject: string;
  templateProps: React.ComponentProps<typeof FollowUpEmail>;
}) {
  return sendEmailTemplate({ to: opts.to, subject: opts.subject, template: 'followUp', props: opts.templateProps });
}
