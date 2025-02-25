import { z } from 'zod';
import { RECIPIENT_TYPE } from '@/utils/constants';

export const organizationTypeSchema = z.nativeEnum(RECIPIENT_TYPE, {
  errorMap: () => ({ message: 'Invalid organization type' }),
});
