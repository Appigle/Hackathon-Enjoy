export type InsightSummary = {
  kpis: { label: string; value: string; delta: number }[];
  topics: { label: string; value: number }[];
  sentiment: { date: string; positive: number; neutral: number; negative: number }[];
  followups: {
    id: string;
    userEmail: string;
    summary: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }[];
};

const seededInsights: InsightSummary = {
  kpis: [
    { label: 'Responses', value: '248', delta: 12 },
    { label: 'Avg. NPS', value: '41', delta: 4 },
    { label: 'Follow-ups sent', value: '56', delta: 8 }
  ],
  topics: [
    { label: 'Wayfinding', value: 34 },
    { label: 'Pricing', value: 21 },
    { label: 'Staff', value: 18 },
    { label: 'Amenities', value: 12 }
  ],
  sentiment: Array.from({ length: 7 }, (_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - idx));
    return {
      date: date.toISOString().slice(0, 10),
      positive: 50 + Math.floor(Math.random() * 20),
      neutral: 20 + Math.floor(Math.random() * 10),
      negative: 10 + Math.floor(Math.random() * 10)
    };
  }),
  followups: [
    {
      id: '1',
      userEmail: 'alex@example.com',
      summary: 'Appreciated the exhibit but signage near the exit was confusing.',
      sentiment: 'neutral'
    },
    {
      id: '2',
      userEmail: 'morgan@example.com',
      summary: 'Loved the staff interactions! Would visit again.',
      sentiment: 'positive'
    }
  ]
};

export function getInsights(): InsightSummary {
  return seededInsights;
}

export function addResponse(response: {
  userEmail: string;
  language: string;
  bodyText: string;
  nps: number;
}) {
  seededInsights.followups.unshift({
    id: `${Date.now()}`,
    userEmail: response.userEmail,
    summary: response.bodyText.slice(0, 140),
    sentiment: response.nps > 8 ? 'positive' : response.nps >= 6 ? 'neutral' : 'negative'
  });
  seededInsights.kpis[0].value = `${parseInt(seededInsights.kpis[0].value, 10) + 1}`;
}
