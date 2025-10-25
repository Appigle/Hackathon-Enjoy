import { NextResponse } from 'next/server';
import { getInsights } from '@/src/services/analytics';

export async function GET() {
  const data = getInsights();
  return NextResponse.json(data);
}
