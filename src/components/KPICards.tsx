'use client';

import { Card, CardContent, Stack, Typography } from '@mui/material';

export type KPI = { label: string; value: string; delta: number };

export default function KPICards({ kpis }: { kpis: KPI[] }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="flex-1">
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              {kpi.label}
            </Typography>
            <Typography variant="h4">{kpi.value}</Typography>
            <Typography color={kpi.delta >= 0 ? 'success.main' : 'error.main'} variant="body2">
              {kpi.delta >= 0 ? '+' : ''}
              {kpi.delta}% vs last week
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
