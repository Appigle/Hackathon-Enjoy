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
  ticketId?: string;
  submittedAt?: string; // e.g., 'Oct 26, 2025 10:14 AM'
  viewStatusUrl: string;
  brandName?: string; // e.g., 'THEMUSEUM'
  brandLogoUrl?: string; // optional logo
  supportEmail?: string; // for footer
};

const brand = {
  bg: '#f7f7f7',
  card: '#ffffff',
  text: '#111827',
  subText: '#6b7280',
  primary: '#111827', // safe for dark mode inversion
  border: '#e5e7eb'
};

export default function FollowUpProcessing({
  greetingName = 'there',
  ticketId,
  submittedAt,
  viewStatusUrl,
  brandName = 'Our Team',
  brandLogoUrl,
  supportEmail = 'support@example.com'
}: Props) {
  const preview = `Thanks for your feedback — we’re processing it now`;
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
                <Text style={{ fontSize: 18, margin: '8px 0 0', fontWeight: 600 }}>
                  Thanks, {greetingName} — we’ve received your feedback
                </Text>
                {submittedAt && (
                  <Text style={{ fontSize: 13, color: brand.subText, marginTop: 4 }}>
                    Submitted on {submittedAt}
                    {ticketId ? ` · Ref #${ticketId}` : ''}
                  </Text>
                )}
              </Column>
            </Row>

            <Hr style={{ borderColor: brand.border, margin: '16px 0 20px' }} />

            <Text style={{ fontSize: 15, lineHeight: '1.7', margin: '0 0 16px' }}>
              We appreciate you taking the time to share your thoughts. Our team is currently
              reviewing your message. If we need more details, we’ll reach out. Otherwise, we’ll
              follow up with any updates or next steps.
            </Text>

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
                You can check the latest status or add more context anytime:
              </Text>
              <Button
                href={viewStatusUrl}
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
                View status
              </Button>
            </Section>

            <Text style={{ fontSize: 14, color: brand.subText, marginTop: 22 }}>
              Thanks again for helping us improve.
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
