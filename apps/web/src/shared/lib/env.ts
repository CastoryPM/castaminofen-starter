import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().trim().url().optional(),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL?.trim() || undefined,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV?.trim(),
});

export function getPublicEnv() {
  return publicEnv;
}

export function getApiBaseUrl() {
  const apiUrl = getPublicEnv().NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    return apiUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    return '/api/v1';
  }

  return 'http://localhost:3001/api/v1';
}
