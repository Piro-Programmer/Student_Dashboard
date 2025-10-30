import { z } from 'zod';

export const studentSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(50, 'First name too long'),
  middleName: z.string().trim().max(50, 'Middle name too long').optional(),
  lastName: z.string().trim().min(1, 'Last name is required').max(50, 'Last name too long'),
  rollNumber: z.string().trim().min(1, 'Roll number is required').max(20, 'Roll number too long'),
  class: z.string().trim().min(1, 'Class is required').max(20, 'Class too long'),
  age: z.coerce
    .number()
    .min(3, 'Age must be at least 3')
    .max(120, 'Age must be less than 120'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
