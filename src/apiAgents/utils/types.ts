import { ZodError } from 'zod';
import { GenericApiError } from './genericApiError';
import { UnhandledApiError } from './unhandledApiError';

export type ApiErrorType = Error | GenericApiError | UnhandledApiError | ZodError