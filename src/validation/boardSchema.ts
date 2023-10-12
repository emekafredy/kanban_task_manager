import z from 'zod';

export const newBoardFormSchema = z.object({
  name: z.string().trim()
    .min(2, 'Name must be at least 2 characters')
    .max(24, 'Name must be less than 25 characters'),
});
