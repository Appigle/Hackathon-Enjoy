'use client';

import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';
import { useSendFollowup } from '@/src/hooks/useSendFollowup';
import { FollowUpInput } from '@/src/services/validators';
import { DEFAULT_CTA_URL } from '@/src/lib/constants';

export default function FollowupDrawer({
  open,
  onClose,
  email
}: {
  open: boolean;
  onClose: () => void;
  email: string | null;
}) {
  const { mutateAsync, isPending, isSuccess } = useSendFollowup();
  const [subject, setSubject] = useState('Thanks for your feedback');
  const [summary, setSummary] = useState('We noted your feedback and are acting on it right away.');

  const handleSend = async () => {
    if (!email) return;
    const payload: FollowUpInput = {
      to: email,
      subject,
      payload: { summary, greetingName: email.split('@')[0], ctaUrl: DEFAULT_CTA_URL }
    };
    await mutateAsync(payload);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 420 } }}>
      <Box className="flex h-full flex-col gap-4 p-6">
        <Typography variant="h6">Compose Follow-up</Typography>
        {isSuccess && <Alert severity="success">Sent! Check SendGrid logs.</Alert>}
        <Stack spacing={2}>
          <TextField label="To" value={email ?? ''} disabled fullWidth />
          <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <TextField
            label="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            multiline
            minRows={4}
          />
        </Stack>
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={isPending || !email}
          sx={{ mt: 'auto' }}
        >
          {isPending ? 'Sending…' : 'Send follow-up'}
        </Button>
      </Box>
    </Drawer>
  );
}
