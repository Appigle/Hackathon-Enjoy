'use client';

import Header from '@/src/components/Header';
import {
  pollJuggernautProcessEvents,
  runJuggernautProcess,
  testApiKey,
  testProcessId
} from '@/src/services/juggernaut';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

export default function JuggernautTestPage() {
  const [processId, setProcessId] = useState(testProcessId);
  const [inputs, setInputs] = useState(
    JSON.stringify({ ticketId: 'CX-1001', language: 'en', sentiment: 'mixed' }, null, 2)
  );
  const [metadata, setMetadata] = useState(
    JSON.stringify(
      { name: 'Dashboard Trigger', description: 'Manual trigger via UI', notes: 'Demo run' },
      null,
      2
    )
  );
  const [referenceId, setReferenceId] = useState('');
  const [runResponse, setRunResponse] = useState<string | null>(null);
  const [pollResponse, setPollResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  const parseJson = (value: string, fallback: object = {}) => {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error('Provide valid JSON for inputs/metadata.');
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setError(null);
    setPollResponse(null);
    try {
      const data = await runJuggernautProcess({
        processId,
        inputs: parseJson(inputs),
        metadata: parseJson(metadata),
        apiKey: testApiKey || 'a781f386fc6256d6d11a1116c0b0efc0efc8bb6d3e45eee6f895cf2eb7a62217'
      });
      setRunResponse(JSON.stringify(data, null, 2));
      setReferenceId(data.referenceId ?? '');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handlePoll = async () => {
    if (!referenceId) return;
    setIsPolling(true);
    setError(null);
    try {
      const data = await pollJuggernautProcessEvents({
        referenceId,
        apiKey: testApiKey || 'a781f386fc6256d6d11a1116c0b0efc0efc8bb6d3e45eee6f895cf2eb7a62217'
      });
      setPollResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPolling(false);
    }
  };

  const endpointDocs = [
    {
      method: 'POST',
      path: '/api/juggernaut/run',
      description: 'Proxies runJuggernautProcess in src/services/juggernaut.ts.',
      sample: `fetch('/api/juggernaut/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    processId: '${testProcessId}',
    inputs: { ticketId: 'CX-1001' },
    metadata: { name: 'Dashboard trigger' }
  })
});`
    },
    {
      method: 'POST',
      path: '/api/juggernaut/poll',
      description: 'Wraps pollJuggernautProcessEvents using the referenceId returned above.',
      sample: `fetch('/api/juggernaut/poll', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ referenceId: 'ref_...' })
});`
    }
  ];

  return (
    <Container maxWidth="lg" className="space-y-8 py-12">
      <Header />
      <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
        <Typography variant="h4" gutterBottom>
          Juggernaut API Test Console
        </Typography>
        <Typography color="text.secondary">
          Trigger the sample process (ID {testProcessId}) and poll for events using the new REST
          utilities. Provide your inputs/metadata when launching and reuse the returned reference ID
          for polling.
        </Typography>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper className="h-full rounded-2xl border border-slate-200 p-6" elevation={0}>
            <Stack spacing={3}>
              <TextField
                label="Process ID"
                value={processId}
                onChange={(event) => setProcessId(event.target.value)}
                fullWidth
              />
              <TextField
                label="Inputs (JSON)"
                value={inputs}
                onChange={(event) => setInputs(event.target.value)}
                multiline
                minRows={6}
                fullWidth
              />
              <TextField
                label="Metadata (JSON)"
                value={metadata}
                onChange={(event) => setMetadata(event.target.value)}
                multiline
                minRows={4}
                fullWidth
              />
              <Button variant="contained" onClick={handleRun} disabled={isRunning}>
                {isRunning ? 'Starting…' : 'Run process'}
              </Button>
              {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={4}>
            <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
              <Typography variant="subtitle1" gutterBottom>
                Run response
              </Typography>
              <Box className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                <pre className="whitespace-pre-wrap break-all">
                  {runResponse ?? 'Run the process to view the reference payload.'}
                </pre>
              </Box>
              <TextField
                label="Reference ID"
                value={referenceId}
                onChange={(event) => setReferenceId(event.target.value)}
                placeholder="Returned after starting the process"
                fullWidth
                className="mt-3"
              />
              <Button
                variant="outlined"
                onClick={handlePoll}
                disabled={!referenceId || isPolling}
                className="mt-3"
              >
                {isPolling ? 'Polling…' : 'Poll results'}
              </Button>
            </Paper>
            <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
              <Typography variant="subtitle1" gutterBottom>
                Poll response
              </Typography>
              <Box className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 min-h-[160px]">
                <pre className="whitespace-pre-wrap break-all">
                  {pollResponse ?? 'Polling results will show here.'}
                </pre>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
        <Typography variant="h6" gutterBottom>
          API reference (powered by existing Juggernaut services)
        </Typography>
        <Typography color="text.secondary" className="mb-4">
          Both endpoints call the utility functions in <code>src/services/juggernaut.ts</code>; no
          duplicate HTTP logic required.
        </Typography>
        <Grid container spacing={3}>
          {endpointDocs.map((endpoint) => (
            <Grid item xs={12} md={6} key={endpoint.path}>
              <Paper className="h-full rounded-xl border border-slate-100 p-4" elevation={0}>
                <Typography variant="subtitle2">
                  <span className="font-mono text-xs text-emerald-600">{endpoint.method}</span>{' '}
                  {endpoint.path}
                </Typography>
                <Typography color="text.secondary" variant="body2" className="mb-3">
                  {endpoint.description}
                </Typography>
                <Box className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
                  <pre className="whitespace-pre-wrap break-all">{endpoint.sample}</pre>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
