'use client';

import { Card, CardContent, Typography } from '@mui/material';

export type SentimentPoint = {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
};

export default function SentimentLine({ data }: { data: SentimentPoint[] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sentiment Trend
        </Typography>
        <div className="grid grid-cols-7 gap-2">
          {data.map((point) => {
            const total = point.positive + point.neutral + point.negative;
            return (
              <div key={point.date} className="text-center">
                <div className="mb-2 flex h-32 flex-col overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-emerald-400"
                    style={{ height: `${(point.positive / total) * 100}%` }}
                  />
                  <div
                    className="bg-amber-300"
                    style={{ height: `${(point.neutral / total) * 100}%` }}
                  />
                  <div
                    className="bg-rose-400"
                    style={{ height: `${(point.negative / total) * 100}%` }}
                  />
                </div>
                <Typography variant="caption" color="text.secondary">
                  {point.date.slice(5)}
                </Typography>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
