'use client';

import { useMutation } from '@tanstack/react-query';
import { FollowUpInput } from '@/src/services/validators';

async function sendFollowUp(body: FollowUpInput) {
  const res = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error('Failed to send follow-up');
  }
  return res.json();
}

export function useSendFollowup() {
  return useMutation({
    mutationFn: sendFollowUp
  });
}
