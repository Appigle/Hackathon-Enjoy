import { Container, Paper, Typography } from '@mui/material';
import SurveyForm from '@/src/components/forms/SurveyForm';
import Header from '@/src/components/Header';

export default function SubmitPage() {
  return (
    <Container maxWidth="md" className="space-y-8 py-12">
      <Header />
      <Paper elevation={0} className="space-y-4 rounded-2xl border border-slate-200 p-8">
        <Typography variant="h4">Share your experience</Typography>
        <Typography color="text.secondary">
          Drop in feedback and we will analyze and respond with thoughtful follow-ups powered by AI-ready
          plumbing.
        </Typography>
        <SurveyForm />
      </Paper>
    </Container>
  );
}
