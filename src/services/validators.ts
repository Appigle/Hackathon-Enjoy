import { z } from 'zod';

export const SurveySchema = z.object({
  userEmail: z.string().email(),
  language: z.string().min(2),
  bodyText: z.string().min(10),
  nps: z.number().min(0).max(10)
});

export const UrlSchema = z.object({
  url: z.string().min(2)
});

export const FollowUpSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(3),
  payload: z.object({
    greetingName: z.string().optional(),
    summary: z.string().min(5),
    ctaUrl: z.string().url()
  })
});

export const TemplateIdSchema = z.enum(['followUp', 'followUpProcessing', 'apology', 'welcome', 'opsAlert']);

export const SendTemplateSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(3),
  template: TemplateIdSchema,
  props: z.record(z.any()).default({})
});

export type SurveyInput = z.infer<typeof SurveySchema>;
export type FollowUpInput = z.infer<typeof FollowUpSchema>;
export type UrlInput = z.infer<typeof UrlSchema>;
export type SendTemplateInput = z.infer<typeof SendTemplateSchema>;
