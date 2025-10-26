'use client';

import FollowUpEmail from '@/emails/FollowUpEmail';
import FollowUpProcessing from '@/emails/FollowUpProcessing';
import NegativeFeedbackApology from '@/emails/NegativeFeedbackApology';
import NegativeFeedbackOpsAlert from '@/emails/NegativeFeedbackOpsAlert';
import WelcomeEmail from '@/emails/WelcomeEmail';
import Header from '@/src/components/Header';
import {
  Alert,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { render } from '@react-email/render';
import { useEffect, useState, type ComponentType } from 'react';

type TemplateId = 'followUp' | 'followUpProcessing' | 'apology' | 'welcome' | 'opsAlert'; // NEW

type TemplateOption = {
  id: TemplateId;
  label: string;
  description: string;
  // Using Record<string, any> to allow non-string types like numbers/arrays for React Email props
  props: Record<string, any>;
};

const templateRegistry: Record<TemplateId, ComponentType<any>> = {
  followUp: FollowUpEmail,
  followUpProcessing: FollowUpProcessing,
  apology: NegativeFeedbackApology,
  welcome: WelcomeEmail,
  opsAlert: NegativeFeedbackOpsAlert // NEW
};

const templateOptions: TemplateOption[] = [
  {
    id: 'followUp',
    label: 'Follow-up Email',
    description: 'Thanks visitors and includes a CTA back to your site.',
    props: {
      greetingName: 'Alex',
      summary:
        'Thanks for visiting! We already logged your signage feedback and will share updates soon.',
      ctaUrl: 'https://pulselab.example.com/feedback'
    }
  },
  {
    id: 'followUpProcessing',
    label: 'Processing Update',
    description: 'Confirms receipt, shows ticket meta, and links to a status page.',
    props: {
      greetingName: 'Alex',
      ticketId: 'SR-2048',
      submittedAt: 'Jun 12, 2024 9:41 AM',
      viewStatusUrl: 'https://pulsepilot.example.com/tickets/SR-2048',
      brandName: 'PulsePilot Support',
      brandLogoUrl: 'https://dummyimage.com/120x40/7c3aed/ffffff&text=PulsePilot',
      supportEmail: 'support@pulsepilot.app'
    }
  },
  {
    id: 'apology',
    label: 'Negative Feedback Apology',
    description: 'High-priority remediation email with next steps and resolution CTA.',
    props: {
      greetingName: 'Jordan',
      brandName: 'PulsePilot Guest Ops',
      issueSummary: 'confusing exit signage',
      makeRightUrl: 'https://pulsepilot.example.com/make-it-right',
      supportEmail: 'ops@pulsepilot.app',
      ticketId: 'CX-5521',
      submittedAt: 'Jun 10, 2024 2:19 PM'
    }
  },
  {
    id: 'welcome',
    label: 'Welcome Email',
    description: 'Onboards new users with a warm greeting.',
    props: {
      userName: 'Jamie',
      productName: 'PulsePilot'
    }
  },
  {
    id: 'opsAlert',
    label: 'Ops Alert (Negative Feedback)',
    description:
      'Internal notification to Operations with sentiment, priority, topics, and quick links.',
    props: {
      brandName: 'PulsePilot CX',
      brandLogoUrl: 'https://dummyimage.com/120x40/111827/ffffff&text=PulsePilot',
      ticketId: 'CX-7719',
      submittedAt: 'Oct 26, 2025 10:14 AM',
      customerEmail: 'alex@example.com',
      customerName: 'Alex R.',
      channel: 'web',
      sentimentPercent: 38,
      priority: 1,
      topics: ['signage', 'navigation', 'accessibility'],
      issueSummary: 'Exit signage was confusing and not wheelchair-friendly',
      excerpt:
        'We loved the exhibit, but finding the exit in a wheelchair took several loops — signs weren’t clear.',
      slaMinutes: 60,
      dashboardUrl: 'https://pulsepilot.example.com/dashboard/tickets/CX-7719',
      escalateUrl: 'https://pulsepilot.example.com/runbooks/escalation#p1',
      playbookUrl: 'https://pulsepilot.example.com/runbooks/signage-accessibility',
      recommended: [
        {
          label: 'Assign to Facilities Lead',
          url: 'https://pulsepilot.example.com/assign?to=facilities&ticket=CX-7719'
        },
        {
          label: 'Schedule Accessibility Review',
          url: 'https://pulsepilot.example.com/calendar/new?topic=accessibility'
        },
        {
          label: 'Add Signage Task to Sprint',
          url: 'https://pulsepilot.example.com/jira/create?project=OPS&ticket=CX-7719'
        }
      ],
      opsEmail: 'ops@pulsepilot.app'
    }
  }
];

export default function EmailPreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption>(templateOptions[0]);
  const [html, setHtml] = useState('');
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sendError, setSendError] = useState<string | null>(null);

  const renderTemplate = (option: TemplateOption) => {
    setIsRendering(true);
    setError(null);
    try {
      const Component = templateRegistry[option.id];
      const htmlOutput = render(<Component {...option.props} />, { pretty: true });
      setHtml(htmlOutput);
    } catch (err: any) {
      setError(err.message ?? 'Failed to render template');
      setHtml('');
    } finally {
      setIsRendering(false);
    }
  };

  useEffect(() => {
    renderTemplate(selectedTemplate);
  }, [selectedTemplate]);

  const handleSendTest = async () => {
    if (!recipientEmail) return;
    setIsSending(true);
    setSendStatus('idle');
    setSendError(null);
    try {
      const response = await fetch('/api/send-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject: `[Preview] ${selectedTemplate.label}`,
          template: selectedTemplate.id,
          props: selectedTemplate.props
        })
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Failed to send email');
      }
      setSendStatus('success');
    } catch (err: any) {
      setSendStatus('error');
      setSendError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container maxWidth="lg" className="space-y-8 py-12">
      <Header />
      <Paper className="rounded-2xl border border-slate-200 p-6" elevation={0}>
        <Stack spacing={2}>
          <Typography variant="h4">Email Template Preview</Typography>
          <Typography color="text.secondary">
            Choose any template to render its React Email markup. Output is rendered below using{' '}
            <Chip size="small" label="dangerouslySetInnerHTML" color="primary" variant="outlined" />{' '}
            — only use this preview with trusted templates.
          </Typography>
        </Stack>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper className="h-full rounded-2xl border border-slate-200 p-6" elevation={0}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="template-select-label">Template</InputLabel>
                <Select
                  labelId="template-select-label"
                  value={selectedTemplate.id}
                  label="Template"
                  onChange={(event) => {
                    const next = templateOptions.find((option) => option.id === event.target.value);
                    if (next) {
                      setSelectedTemplate(next);
                    }
                  }}
                >
                  {templateOptions.map((option) => (
                    <MenuItem value={option.id} key={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">
                {selectedTemplate.description}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => renderTemplate(selectedTemplate)}
                disabled={isRendering}
              >
                {isRendering ? 'Rendering…' : 'Refresh preview'}
              </Button>
              {error && (
                <Typography variant="body2" color="error.main">
                  {error}
                </Typography>
              )}
              <div className="border-t border-slate-200 pt-4">
                <Typography variant="subtitle2" gutterBottom>
                  Send a test email
                </Typography>
                <TextField
                  label="Recipient email"
                  size="small"
                  type="email"
                  value={recipientEmail}
                  onChange={(event) => setRecipientEmail(event.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  className="mt-3"
                  disabled={!recipientEmail || isSending}
                  onClick={handleSendTest}
                >
                  {isSending ? 'Sending…' : 'Send template'}
                </Button>
                {sendStatus === 'success' && (
                  <Alert severity="success" className="mt-3">
                    Sent with /api/send-template
                  </Alert>
                )}
                {sendStatus === 'error' && (
                  <Alert severity="error" className="mt-3">
                    {sendError ?? 'Unable to send email'}
                  </Alert>
                )}
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            className="min-h-[420px] rounded-2xl border border-slate-200 bg-white"
            elevation={0}
            sx={{ overflow: 'auto' }}
          >
            <div className="border-b border-slate-100 px-6 py-4">
              <Typography variant="subtitle1">{selectedTemplate.label} markup</Typography>
              <Typography variant="caption" color="text.secondary">
                Rendered via @react-email/render with pretty print enabled.
              </Typography>
            </div>
            <div className="p-0">
              {html ? (
                <div
                  className="min-h-[320px] rounded-xl border border-slate-100 bg-slate-50 p-6"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <Typography color="text.secondary">
                  {isRendering ? 'Rendering...' : 'No preview yet.'}
                </Typography>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
