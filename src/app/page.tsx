import Link from 'next/link';
import { Button, Container, Typography, Stack } from '@mui/material';
import Header from '@/src/components/Header';

export default function HomePage() {
  return (
    <Container maxWidth="md" className="py-16">
      <Stack spacing={6}>
        <Header />
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Typography variant="h4" component="h1" gutterBottom>
            Customer Surveys & Follow-Ups
          </Typography>
          <Typography color="text.secondary">
            Send beautiful follow-ups, capture open-ended insights, and keep tabs on sentiment in one
            dashboard. Jump into the dashboard or submit a sample response to see the flow.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="mt-6">
            <Button component={Link} href="/dashboard" variant="contained">
              View Dashboard
            </Button>
            <Button component={Link} href="/submit" variant="outlined">
              Submit Feedback
            </Button>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
}
