import { Body, Container, Head, Hr, Html, Preview, Section, Text } from '@react-email/components';

type Props = { userName?: string; productName?: string };

export default function WelcomeEmail({ userName = 'Friend', productName = 'PulsePilot' }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {productName}</Preview>
      <Body style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
        <Section style={{ padding: '32px 0' }}>
          <Container style={{ borderRadius: 16, padding: 32, maxWidth: 640 }}>
            <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Hi {userName},</Text>
            <Text style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>
              Thanks for trying {productName}! We built it to help teams collect rich customer
              feedback, surface insights, and send thoughtful follow-ups in minutes.
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 1.6 }}>
              Jump into your dashboard to explore live surveys, or invite a teammate so you can
              collaborate on the go.
            </Text>
            <Hr style={{ margin: '32px 0', borderColor: '#e2e8f0' }} />
            <Text style={{ fontSize: 14, color: '#64748b' }}>
              PulsePilot • 123 Demo Street • San Francisco, CA
            </Text>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}
