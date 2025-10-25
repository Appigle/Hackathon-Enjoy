'use client';

import { useState } from 'react';
import { Container, Grid, Paper, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import Header from '@/src/components/Header';
import KPICards from '@/src/components/KPICards';
import TopicBar from '@/src/components/TopicBar';
import SentimentLine from '@/src/components/SentimentLine';
import FollowupDrawer from '@/src/components/FollowupDrawer';
import { useInsights } from '@/src/hooks/useInsights';

export default function DashboardPage() {
  const { data, isLoading } = useInsights();
  const [drawerEmail, setDrawerEmail] = useState<string | null>(null);

  if (isLoading || !data) {
    return (
      <Container maxWidth="lg" className="py-12">
        <Header />
        <Typography>Loading insights…</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="space-y-8 py-12">
      <Header />
      <KPICards kpis={data.kpis} />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
            <Typography variant="h6" gutterBottom>
              Hot Topics
            </Typography>
            <TopicBar topics={data.topics} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <SentimentLine data={data.sentiment} />
        </Grid>
      </Grid>
      <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
        <Typography variant="h6" gutterBottom>
          Follow-up queue
        </Typography>
        <List>
          {data.followups.map((item) => (
            <ListItemButton key={item.id} onClick={() => setDrawerEmail(item.userEmail)}>
              <ListItemText primary={item.userEmail} secondary={item.summary} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
      <FollowupDrawer open={!!drawerEmail} email={drawerEmail} onClose={() => setDrawerEmail(null)} />
    </Container>
  );
}
