import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components';
import * as React from 'react';

type ActionItem = { label: string; url?: string };

type Props = {
  brandName?: string;
  brandLogoUrl?: string;

  // Feedback meta
  ticketId: string;
  submittedAt: string; // e.g., 'Oct 26, 2025 10:14 AM'
  customerEmail?: string;
  customerName?: string;
  channel?: string; // 'web', 'email', 'kiosk', etc.

  // Analysis
  sentimentPercent: number; // 0–100
  priority: 1 | 2 | 3; // 1=highest
  topics: string[]; // ['accessibility','pricing']
  issueSummary: string; // short human-readable summary
  excerpt: string; // short feedback excerpt (plain text)

  // Ops
  slaMinutes?: number; // e.g., 60 for P1
  dashboardUrl: string; // deep link to ticket in dashboard
  escalateUrl?: string; // optional escalation policy link
  playbookUrl?: string; // optional runbook
  recommended?: ActionItem[]; // suggested next steps

  // Footer
  opsEmail?: string; // for contact
};

const palette = {
  bg: '#f7f7f7',
  card: '#ffffff',
  text: '#111827',
  sub: '#6b7280',
  border: '#e5e7eb',
  // status colors
  danger: '#b91c1c',
  dangerBg: '#fef2f2',
  warn: '#a16207',
  warnBg: '#fffbeb',
  good: '#166534',
  goodBg: '#ecfdf5',
  // buttons
  primary: '#111827'
};

function Badge({
  tone = 'danger',
  children
}: {
  tone?: 'danger' | 'warn' | 'good';
  children: React.ReactNode;
}) {
  const bg =
    tone === 'danger' ? palette.dangerBg : tone === 'warn' ? palette.warnBg : palette.goodBg;
  const fg = tone === 'danger' ? palette.danger : tone === 'warn' ? palette.warn : palette.good;
  return (
    <span
      style={{
        backgroundColor: bg,
        color: fg,
        borderRadius: 999,
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 600,
        display: 'inline-block'
      }}
    >
      {children}
    </span>
  );
}

export default function NegativeFeedbackOpsAlert({
  brandName = 'CX Platform',
  brandLogoUrl,
  ticketId,
  submittedAt,
  customerEmail,
  customerName,
  channel = 'web',
  sentimentPercent,
  priority,
  topics = [],
  issueSummary,
  excerpt,
  slaMinutes = 60,
  dashboardUrl,
  escalateUrl,
  playbookUrl,
  recommended = [],
  opsEmail = 'ops@example.com'
}: Props) {
  const preview = `P${priority} negative feedback — ${issueSummary}`;
  const tone: 'danger' | 'warn' | 'good' =
    sentimentPercent < 50 ? 'danger' : sentimentPercent < 70 ? 'warn' : 'good';

  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: palette.bg,
          fontFamily: 'Inter, Arial, sans-serif',
          color: palette.text
        }}
      >
        <Container style={{ maxWidth: 680, margin: '0 auto', padding: 24 }}>
          <Section
            style={{
              borderRadius: 16,
              padding: 24
            }}
          >
            <Row>
              <Column style={{ textAlign: 'left' }}>
                {brandLogoUrl && (
                  <Img
                    src={brandLogoUrl}
                    width="120"
                    alt={brandName}
                    style={{ marginBottom: 12 }}
                  />
                )}
                <Text style={{ fontSize: 18, fontWeight: 700, margin: '6px 0 2px' }}>
                  New Negative Feedback • Ticket #{ticketId}
                </Text>
                <Text style={{ fontSize: 13, color: palette.sub, margin: 0 }}>
                  Submitted {submittedAt} • Source: {channel}
                </Text>
              </Column>
            </Row>

            <Hr style={{ borderColor: palette.border, margin: '16px 0' }} />

            <Row style={{ marginBottom: 8 }}>
              <Column>
                <Badge tone={tone}>Sentiment {Math.round(sentimentPercent)}%</Badge>
                <span style={{ display: 'inline-block', width: 8 }} />
                <Badge tone="danger">Priority P{priority}</Badge>
                {!!topics.length && (
                  <>
                    <span style={{ display: 'inline-block', width: 8 }} />
                    <Badge tone="warn">{topics.slice(0, 3).join(' • ')}</Badge>
                  </>
                )}
              </Column>
            </Row>

            <Section
              style={{
                backgroundColor: '#fafafa',
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
                padding: 16,
                marginTop: 8
              }}
            >
              <Text style={{ fontSize: 14, color: palette.sub, margin: 0 }}>Issue summary</Text>
              <Text style={{ fontSize: 15, margin: '6px 0 0' }}>{issueSummary}</Text>
            </Section>

            <Section
              style={{
                backgroundColor: '#fff',
                border: `1px solid ${palette.border}`,
                borderRadius: 12,
                padding: 16,
                marginTop: 12
              }}
            >
              <Text style={{ fontSize: 14, color: palette.sub, margin: 0 }}>Customer excerpt</Text>
              <Text style={{ fontSize: 15, margin: '6px 0 0', whiteSpace: 'pre-wrap' }}>
                “{excerpt}”
              </Text>
              {(customerName || customerEmail) && (
                <Text style={{ fontSize: 13, color: palette.sub, marginTop: 8 }}>
                  {customerName ? `${customerName}` : 'Customer'}
                  {customerEmail ? ` • ${customerEmail}` : ''}
                </Text>
              )}
            </Section>

            <Section style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 14, color: palette.sub, margin: 0 }}>SLA</Text>
              <Text style={{ fontSize: 15, margin: '6px 0 0' }}>
                Respond within <strong>{slaMinutes} minutes</strong>. Higher tiers: escalate
                immediately.
              </Text>
            </Section>

            {!!recommended.length && (
              <Section
                style={{
                  backgroundColor: '#fafafa',
                  border: `1px solid ${palette.border}`,
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 12
                }}
              >
                <Text style={{ fontSize: 14, color: palette.sub, margin: 0 }}>
                  Recommended next steps
                </Text>
                <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                  {recommended.map((a, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>
                      <Text style={{ fontSize: 14, margin: 0 }}>
                        {a.url ? <Link href={a.url}>{a.label}</Link> : a.label}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Row style={{ marginTop: 16 }}>
              <Column>
                <Button
                  href={dashboardUrl}
                  style={{
                    display: 'inline-block',
                    backgroundColor: palette.primary,
                    color: '#fff',
                    fontSize: 14,
                    padding: '10px 14px',
                    borderRadius: 10,
                    textDecoration: 'none'
                  }}
                >
                  Open in Dashboard
                </Button>
                {escalateUrl && (
                  <Button
                    href={escalateUrl}
                    style={{
                      display: 'inline-block',
                      marginLeft: 10,
                      backgroundColor: palette.danger,
                      color: '#fff',
                      fontSize: 14,
                      padding: '10px 14px',
                      borderRadius: 10,
                      textDecoration: 'none'
                    }}
                  >
                    Escalate Now
                  </Button>
                )}
              </Column>
            </Row>

            <Hr style={{ borderColor: palette.border, margin: '18px 0' }} />

            <Text style={{ fontSize: 12, color: palette.sub, margin: 0 }}>
              Runbook
              {playbookUrl ? (
                <>
                  : <Link href={playbookUrl}>{playbookUrl}</Link>
                </>
              ) : (
                ''
              )}{' '}
              · Contact Ops: <Link href={`mailto:${opsEmail}`}>{opsEmail}</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
