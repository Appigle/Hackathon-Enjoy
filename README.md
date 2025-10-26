# Customer Surveys & Follow-Ups (Next.js + React Query + SendGrid + React Email + MUI + Tailwind + RHF + Vercel AI)

An AI-ready starter that collects open-ended customer feedback, analyzes it, and drafts/send follow-ups. Built for rapid iteration and live demos.

## ✨ Stack

- **App**: Next.js 14+ (App Router, TypeScript)
- **State/Data**: React Query (TanStack)
- **UI**: Material UI (MUI) + TailwindCSS
- **Forms**: React Hook Form (+ Zod validation)
- **Email**: SendGrid API + React Email templates
- **AI UI**: Vercel AI Components (optional chat/completion UX)

> Note: You can plug in your LLM backend later. This starter focuses on the plumbing/UI + email delivery.

---

## 🚀 Quick Start

### 1) Prerequisites

- Node.js **v20 LTS**
- A SendGrid account + API key (Mail settings → “Sandbox mode” is fine for dev)
- (Optional) An OpenAI-compatible API key if you want to wire Vercel AI Components for real completions.

### 2) Clone & Install

```bash
npm install
```

### 3) Environment Variables

Create `.env.local` from the baseline:

```bash
cp .env.example .env.local
```

Fill the values:

```ini
# Public app URL (for links in emails)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# SendGrid
SENDGRID_API_KEY=
EMAIL_FROM="Your App <no-reply@your-domain.com>"

# (Optional) OpenAI-compatible for Vercel AI Components
OPENAI_API_KEY=
OPENAI_BASE_URL=  # leave empty if using the default OpenAI endpoint
```

### 4) Dev

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

* **/submit** — demo survey form
* **/dashboard** — KPIs, topics, sentiment, follow-ups queue (mock analytics)

### 5) Build & Preview

```bash
npm run build
npm run preview
```

---

## 🧱 Project Structure (Key Files)

```
emails/FollowUpEmail.tsx        # React Email template (TSX -> HTML)
src/app/api/send/route.ts       # API route to send emails with SendGrid
src/services/email.ts           # SendGrid wrapper + react-email render
src/app/(public)/submit/page.tsx
src/app/(dashboard)/dashboard/page.tsx
src/providers/QueryProvider.tsx  # React Query (client)
src/providers/MUIThemeProvider.tsx
src/components/forms/SurveyForm.tsx
src/services/validators.ts       # zod schemas for inputs
```

---

## 🔌 Integrations

### Tailwind + Material UI

* Tailwind is added for utility-first styling.
* Material UI provides accessible, production-ready components and theming.
* We use MUI’s Emotion styling with `CssBaseline` and a custom theme, and Tailwind utilities alongside.

**Important:** Keep Tailwind’s `content` globs including `./src/**/*.{ts,tsx}` and `./emails/**/*.{ts,tsx}` (for react-email previews).

### React Query

* A root `QueryClientProvider` lives in `src/providers/QueryProvider.tsx`.
* Example hooks:

  * `useInsights` — fetch dashboard aggregates
  * `useSendFollowup` — call send endpoint with optimistic updates

### React Hook Form

* `SurveyForm.tsx` demonstrates RHF + Zod resolver for safe, ergonomic forms.
* Add more forms (e.g., follow-up editor) the same way.

### SendGrid + React Email

* Build your email UI in `emails/FollowUpEmail.tsx`.
* The API route renders TSX → HTML and sends via SendGrid.
* In dev, you can “sandbox” or log raw HTML for quick verification.

### Vercel AI Components (Optional)

* Included provider and example wiring; you can add a chat panel in the dashboard to “ask the data” or to regenerate email copy with a prompt:

  * `useChat` / `useCompletion` with your model endpoint.
* Disable gracefully if `OPENAI_API_KEY` is missing.

---

## 🧪 Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "preview": "next start -p 3000",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "test": "vitest run",
    "seed": "tsx scripts/seed.ts"
  }
}
```

* `seed` adds a few fake responses to make the dashboard interesting.

---

## 🗂️ Example Endpoints

### `POST /api/surveys`

Accept a survey submission.

**Body**

```json
{
  "userEmail": "alex@example.com",
  "language": "en",
  "bodyText": "Loved the exhibit but signage near the exit was confusing.",
  "nps": 6
}
```

**Response**

```json
{ "ok": true, "data": { "responseId": "uuid" } }
```

### `POST /api/send`

Send (or simulate-send) a follow-up email.

**Body**

```json
{
  "to": "alex@example.com",
  "subject": "Thanks for your feedback",
  "payload": {
    "greetingName": "Alex",
    "summary": "Thanks for visiting! We noted the signage issue...",
    "ctaUrl": "https://your-app.vercel.app/feedback/thanks"
  }
}
```

**Response**

```json
{ "ok": true, "data": { "id": "sg-message-id", "simulated": false } }
```

### `POST /api/send-template`

Render any registered React Email template and dispatch it via SendGrid.

**Body**

```json
{
  "to": "team@example.com",
  "subject": "[Preview] Ops Alert",
  "template": "opsAlert",
  "props": {
    "ticketId": "CX-7719",
    "customerEmail": "alex@example.com"
  }
}
```

**Response**

```json
{ "ok": true, "data": { "id": "sg-message-id", "simulated": false } }
```

---

## 🧩 Code Snippets (Core Pieces)

### 1) React Email Template (`emails/FollowUpEmail.tsx`)

```tsx
import * as React from 'react';
import { Html, Head, Preview, Body, Container, Text, Link, Hr } from '@react-email/components';

type Props = { greetingName?: string; summary: string; ctaUrl: string };

export default function FollowUpEmail({ greetingName = 'Friend', summary, ctaUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for your feedback — a quick follow-up</Preview>
      <Body style={{ backgroundColor: '#f7f7f7', fontFamily: 'Inter, Arial' }}>
        <Container style={{ backgroundColor: '#fff', padding: '24px', borderRadius: 12 }}>
          <Text style={{ fontSize: 16 }}>Hi {greetingName},</Text>
          <Text style={{ fontSize: 16, lineHeight: 1.6 }}>{summary}</Text>
          <Text>
            <Link href={ctaUrl}>Tell us more or update your preferences</Link>
          </Text>
          <Hr />
          <Text style={{ color: '#6b7280', fontSize: 12 }}>Sent by Your App</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

### 2) SendGrid Wrapper (`src/services/email.ts`)

```ts
import sgMail from '@sendgrid/mail';
import { render } from '@react-email/render';
import FollowUpEmail from '@/emails/FollowUpEmail';

const key = process.env.SENDGRID_API_KEY;
const from = process.env.EMAIL_FROM || 'no-reply@example.com';

if (key) sgMail.setApiKey(key);

export async function sendFollowUp(opts: {
  to: string;
  subject: string;
  templateProps: React.ComponentProps<typeof FollowUpEmail>;
}) {
  const html = render(<FollowUpEmail {...opts.templateProps} />);
  const text = `Hi ${opts.templateProps.greetingName ?? 'there'},\n\n${opts.templateProps.summary}\n\nOpen: ${opts.templateProps.ctaUrl}`;

  if (!key) {
    console.warn('[email] SENDGRID_API_KEY missing — simulate send');
    return { id: `simulated-${Date.now()}`, simulated: true, html, text };
  }

  const [res] = await sgMail.send({
    to: opts.to,
    from,
    subject: opts.subject,
    html,
    text
  });
  return { id: res.headers['x-message-id'] ?? 'unknown', simulated: false };
}
```

### 3) API Route: `/api/send/route.ts`

```ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendFollowUp } from '@/src/services/email';

const Body = z.object({
  to: z.string().email(),
  subject: z.string().min(3),
  payload: z.object({
    greetingName: z.string().optional(),
    summary: z.string().min(5),
    ctaUrl: z.string().url()
  })
});

export async function POST(req: NextRequest) {
  try {
    const body = Body.parse(await req.json());
    const result = await sendFollowUp({
      to: body.to,
      subject: body.subject,
      templateProps: {
        greetingName: body.payload.greetingName,
        summary: body.payload.summary,
        ctaUrl: body.payload.ctaUrl
      }
    });
    return NextResponse.json({ ok: true, data: result });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'send_failed' }, { status: 400 });
  }
}
```

### 4) Providers (React Query + MUI) — `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/src/providers/QueryProvider';
import MUIThemeProvider from '@/src/providers/MUIThemeProvider';

export const metadata: Metadata = { title: 'Customer Feedback', description: 'Survey & follow-ups' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MUIThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
```

---

## 🎨 Tailwind Setup

`tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './emails/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}'
  ],
  theme: { extend: {} },
  plugins: []
} satisfies Config;
```

`src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* MUI and Tailwind play nicely; prefer Tailwind for spacing/layout utilities. */
```

---

## 🧭 Suggested Next Steps

1. Wire the **/api/surveys** endpoint and persist to your DB of choice.
2. Add a **Dashboard** that lists submissions and lets you preview/send follow-ups.
3. (Optional) Add a **Chat panel** with Vercel AI Components to regenerate email copy by prompt.
4. Deploy to **Vercel**, set env vars, and test with SendGrid Sandbox.

---

## 📄 License

MIT
