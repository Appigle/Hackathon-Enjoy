'use client';

import { useQuery } from '@tanstack/react-query';
import type { InsightSummary } from '@/src/services/analytics';

async function fetchInsights(): Promise<InsightSummary> {
  const res = await fetch('/api/insights');
  if (!res.ok) throw new Error('Failed to load insights');
  return res.json();
}

export function useInsights() {
  return useQuery<InsightSummary>({ queryKey: ['insights'], queryFn: fetchInsights });
}
