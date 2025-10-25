export const DEFAULT_CTA_URL = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/feedback`
  : 'https://example.com/feedback';

export const SAMPLE_TOPICS = ['Wayfinding', 'Pricing', 'Staff', 'Amenities'];

export const SAMPLE_SENTIMENT = [
  { label: 'Positive', value: 62 },
  { label: 'Neutral', value: 23 },
  { label: 'Negative', value: 15 }
];

export const FOLLOW_UP_PRESETS = [
  {
    id: 'thanks',
    subject: 'Thanks for your feedback',
    summary:
      'We appreciate you visiting the experience and already logged the signage issue with our ops team.',
    ctaUrl: DEFAULT_CTA_URL
  },
  {
    id: 'nps-promoter',
    subject: 'You made our day',
    summary: 'Thanks for rating us highly – a quick note to share an upcoming sneak peek!',
    ctaUrl: DEFAULT_CTA_URL
  }
];
