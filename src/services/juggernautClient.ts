const BASE_URL = 'https://core.juggernautlabs.ai/api/resource';
export const testProcessId = '6838b06e3e420c278bfe5a42';
export const testApiKey = process.env.JUGGERNAUT_API_KEY ?? '';
// const testProcessId = '6838b06e3e420c278bfe5a42';
// const testApiKey = process.env.JUGGERNAUT_API_KEY;
export type JuggernautMetadata = {
  name: string;
  description?: string;
  notes?: string;
};

export type RunJuggernautProcessParams = {
  processId: string;
  apiKey: string;
  inputs: Record<string, unknown>;
  metadata: JuggernautMetadata;
};

export type RunJuggernautProcessResponse = {
  referenceId: string;
  status: string;
  [key: string]: unknown;
};

/**
 * Triggers a Juggernaut process run.
 * - `processId` is the ID of the process to run.
 * - `apiKey` comes from the API Keys tab in the Juggernaut dashboard.
 * - `inputs` should mirror the process input schema.
 * - `metadata` requires a name and can include description/notes for traceability.
 */
export async function runJuggernautProcess({
  processId,
  apiKey = testApiKey ?? '',
  inputs,
  metadata
}: RunJuggernautProcessParams): Promise<RunJuggernautProcessResponse> {
  if (!apiKey) {
    throw new Error('Juggernaut API key is required');
  }

  const response = await fetch(`${BASE_URL}/process/${processId}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({ inputs, metadata })
  });

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new Error(`Juggernaut process run failed (${response.status}): ${message}`);
  }

  return response.json();
}

export type PollJuggernautEventsParams = {
  referenceId: string;
  apiKey: string;
};

/**
 * Polls for process events/results using the referenceId returned from runJuggernautProcess.
 */
export async function pollJuggernautProcessEvents<T = unknown>({
  referenceId,
  apiKey = testApiKey ?? ''
}: PollJuggernautEventsParams): Promise<T> {
  if (!apiKey) {
    throw new Error('Juggernaut API key is required');
  }

  const response = await fetch(`${BASE_URL}/process/events/${referenceId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    const message = await safeErrorMessage(response);
    throw new Error(`Juggernaut polling failed (${response.status}): ${message}`);
  }

  return response.json() as Promise<T>;
}

async function safeErrorMessage(response: Response) {
  try {
    const data = await response.json();
    return data?.error ?? data?.message ?? response.statusText;
  } catch {
    return response.statusText;
  }
}
