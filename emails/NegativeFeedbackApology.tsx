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

type Props = {
  greetingName?: string;
  brandName?: string;
  brandLogoUrl?: string;
  issueSummary?: string; // short human-readable summary from your LLM (e.g., "confusing exit signage")
  makeRightUrl: string; // link to schedule a call / claim voucher / update ticket
  supportEmail?: string;
  ticketId?: string;
  submittedAt?: string;
};

const brand = {
  bg: '#f7f7f7',
  card: '#ffffff',
  text: '#111827',
  subText: '#6b7280',
  primary: '#b91c1c', // red-ish for apology emphasis; still AA contrast on white
  border: '#e5e7eb',
  badgeBg: '#fef2f2',
  badgeText: '#991b1b'
};

export default function NegativeFeedbackApology({
  greetingName = 'there',
  brandName = 'Our Team',
  brandLogoUrl,
  issueSummary = 'the issue you experienced',
  makeRightUrl,
  supportEmail = 'support@example.com',
  ticketId,
  submittedAt
}: Props) {
  const preview = `We’re sorry about your recent experience — here’s what we’re doing`;
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: brand.bg,
          fontFamily: 'Inter, Arial, sans-serif',
          color: brand.text
        }}
      >
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
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
                <Text style={{ fontSize: 18, margin: '8px 0 0', fontWeight: 700 }}>
                  We’re sorry, {greetingName}
                </Text>
                {(submittedAt || ticketId) && (
                  <Text style={{ fontSize: 13, color: brand.subText, marginTop: 4 }}>
                    {submittedAt ? `Submitted on ${submittedAt}` : ''}
                    {ticketId ? ` · Ref #${ticketId}` : ''}
                  </Text>
                )}
              </Column>
            </Row>

            <Section
              style={{
                backgroundColor: brand.badgeBg,
                borderRadius: 12,
                padding: 12,
                marginTop: 12
              }}
            >
              <Text style={{ color: brand.badgeText, fontSize: 13, margin: 0 }}>
                We recognized this as a high-priority concern.
              </Text>
            </Section>

            <Hr style={{ borderColor: brand.border, margin: '16px 0 20px' }} />

            <Text style={{ fontSize: 15, lineHeight: '1.7', margin: '0 0 12px' }}>
              Thank you for telling us about <strong>{issueSummary}</strong>. We didn’t meet our
              standard here, and we’re sorry for the frustration this caused.
            </Text>

            <Text style={{ fontSize: 15, lineHeight: '1.7', margin: '0 0 12px' }}>
              Here’s what we’re doing now:
            </Text>

            <ul style={{ paddingLeft: 18, marginTop: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 14, margin: 0 }}>
                  <strong>Immediate fix:</strong> Our team is addressing the issue to prevent
                  repeat.
                </Text>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 14, margin: 0 }}>
                  <strong>Review & prevention:</strong> We’re updating our process and adding
                  checks.
                </Text>
              </li>
              <li>
                <Text style={{ fontSize: 14, margin: 0 }}>
                  <strong>Follow-up:</strong> We’ll confirm once changes are live.
                </Text>
              </li>
            </ul>

            <Section
              style={{
                backgroundColor: '#fafafa',
                border: `1px solid ${brand.border}`,
                borderRadius: 12,
                padding: 16,
                marginTop: 8
              }}
            >
              <Text style={{ fontSize: 14, color: brand.subText, margin: 0 }}>
                We’d like to make this right. You can choose the best next step:
              </Text>
              <Button
                href={makeRightUrl}
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  backgroundColor: brand.primary,
                  color: '#fff',
                  fontSize: 14,
                  padding: '10px 14px',
                  borderRadius: 10,
                  textDecoration: 'none'
                }}
              >
                Continue → Choose a resolution
              </Button>
            </Section>

            <Text style={{ fontSize: 14, color: brand.subText, marginTop: 22 }}>
              If you prefer, reply directly to this email and we’ll help.
            </Text>

            <Text style={{ fontSize: 14, margin: '10px 0 0' }}>— {brandName}</Text>
          </Section>

          <Section style={{ textAlign: 'center', padding: 18 }}>
            <Text style={{ color: brand.subText, fontSize: 12, margin: 0 }}>
              Need help? <Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
