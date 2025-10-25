import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/src/providers/QueryProvider';
import MUIThemeProvider from '@/src/providers/MUIThemeProvider';
import AIProvider from '@/src/providers/AIProvider';

export const metadata: Metadata = {
  title: 'Customer Surveys & Follow-Ups',
  description: 'Collect feedback, analyze it, and send thoughtful follow-ups.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <MUIThemeProvider>
          <QueryProvider>
            <AIProvider>{children}</AIProvider>
          </QueryProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
