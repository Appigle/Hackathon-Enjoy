import { Body, Container, Head, Hr, Html, Link, Preview, Text } from '@react-email/components';

type Props = { greetingName?: string; summary: string; ctaUrl: string };

export default function FollowUpEmail({ greetingName = 'Friend', summary, ctaUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for your feedback — a quick follow-up</Preview>
      <Body style={{ backgroundColor: '#f7f7f7', fontFamily: 'Inter, Arial' }}>
        <Container style={{ padding: '24px', borderRadius: 12 }}>
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
