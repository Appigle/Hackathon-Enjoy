'use client';

import { LinearProgress, Stack, Typography } from '@mui/material';

export type Topic = { label: string; value: number };

export default function TopicBar({ topics }: { topics: Topic[] }) {
  const max = Math.max(...topics.map((topic) => topic.value));
  return (
    <Stack spacing={2}>
      {topics.map((topic) => (
        <div key={topic.label}>
          <div className="flex items-center justify-between">
            <Typography>{topic.label}</Typography>
            <Typography variant="body2" color="text.secondary">
              {topic.value}
            </Typography>
          </div>
          <LinearProgress
            variant="determinate"
            value={(topic.value / max) * 100}
            sx={{ mt: 1, height: 8, borderRadius: 999 }}
          />
        </div>
      ))}
    </Stack>
  );
}
