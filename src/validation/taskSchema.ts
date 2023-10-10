import z from 'zod';

const subtasksSchema = z.array(z.object({
  title: z.string().trim()
    .min(2, 'Subtask description must be at least 2 characters')
    .max(70, 'Subtask description must be less than 25 characters'),
  isCompleted: z.boolean().default(false),
}).optional()).optional();

export const newTaskFormSchema = z.object({
  title: z.string().trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: z.string().trim()
    .min(2, 'Description must be at least 2 characters')
    .max(500, 'Description must be less than 500 characters'),
  subtasks: subtasksSchema,
  status: z.string().trim()
      .min(2, 'Status must be at least 2 characters')
});
