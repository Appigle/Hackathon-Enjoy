'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveySchema, type SurveyInput } from '@/src/services/validators';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';

export default function SurveyForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SurveyInput>({
    resolver: zodResolver(SurveySchema),
    defaultValues: { language: 'en', nps: 7, userEmail: '', bodyText: '' }
  });

  const onSubmit = async (values: SurveyInput) => {
    setStatus('idle');
    const res = await fetch('/api/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (res.ok) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Stack spacing={2}>
        <TextField
          label="Email"
          placeholder="alex@example.com"
          error={!!errors.userEmail}
          helperText={errors.userEmail?.message}
          {...register('userEmail')}
        />
        <TextField
          label="Primary language"
          placeholder="en"
          error={!!errors.language}
          helperText={errors.language?.message}
          {...register('language')}
        />
        <TextField
          label="Feedback"
          placeholder="Tell us about your visit…"
          multiline
          minRows={4}
          error={!!errors.bodyText}
          helperText={errors.bodyText?.message}
          {...register('bodyText')}
        />
        <TextField
          type="number"
          label="NPS"
          inputProps={{ min: 0, max: 10 }}
          error={!!errors.nps}
          helperText={errors.nps?.message ?? '0-10'}
          {...register('nps', { valueAsNumber: true })}
        />
        {status === 'success' && <Alert severity="success">Response captured!</Alert>}
        {status === 'error' && <Alert severity="error">Something went wrong.</Alert>}
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit feedback'}
        </Button>
      </Stack>
    </form>
  );
}
