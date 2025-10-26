'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Stack, TextField, Button } from '@mui/material';
import { UrlInput, UrlSchema } from '@/src/services/validators';

export default function UrlForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<UrlInput>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      url: ''
    }
  });
  const onSubmit = async (value: UrlInput) => {
    setStatus('idle');
    const res = await fetch('/api/urlForm', {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(value)
    });
    if (res.ok) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Url"
          helperText={errors.url?.message}
          error={!!errors.url}
          {...register('url')}
        />
        {status === 'success' && <Alert severity="success">Submitted!</Alert>}
        {status === 'error' && <Alert severity="error">Something went wrong.</Alert>}
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit'}
        </Button>
      </Stack>
    </form>
  );
}
