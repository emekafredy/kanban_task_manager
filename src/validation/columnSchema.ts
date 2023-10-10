import z from 'zod';

export const newColumnFormSchema = z.object({
  name: z.string().trim()
    .min(2, 'Name must be at least 2 characters')
    .max(15, 'Name must be less than 15 characters'),
});
