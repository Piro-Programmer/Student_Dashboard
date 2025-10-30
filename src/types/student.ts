export interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  rollNumber: string;
  class: string;
  age: number;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
}

export type StudentFormData = Omit<Student, 'id'>;
