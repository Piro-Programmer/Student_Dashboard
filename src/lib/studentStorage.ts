import { Student } from '@/types/student';

const STORAGE_KEY = 'students';

const seedData: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    middleName: 'Grace',
    lastName: 'Johnson',
    rollNumber: 'STU001',
    class: '10-A',
    age: 15,
    dateOfBirth: '2009-05-15',
    gender: 'Female',
  },
  {
    id: '2',
    firstName: 'Liam',
    lastName: 'Smith',
    rollNumber: 'STU002',
    class: '10-B',
    age: 16,
    dateOfBirth: '2008-08-22',
    gender: 'Male',
  },
  {
    id: '3',
    firstName: 'Sophia',
    middleName: 'Marie',
    lastName: 'Williams',
    rollNumber: 'STU003',
    class: '9-A',
    age: 14,
    dateOfBirth: '2010-03-10',
    gender: 'Female',
  },
  {
    id: '4',
    firstName: 'Noah',
    lastName: 'Brown',
    rollNumber: 'STU004',
    class: '11-A',
    age: 17,
    dateOfBirth: '2007-11-30',
    gender: 'Male',
  },
  {
    id: '5',
    firstName: 'Ava',
    middleName: 'Rose',
    lastName: 'Davis',
    rollNumber: 'STU005',
    class: '10-A',
    age: 15,
    dateOfBirth: '2009-07-18',
    gender: 'Female',
  },
  {
    id: '6',
    firstName: 'Oliver',
    lastName: 'Miller',
    rollNumber: 'STU006',
    class: '9-B',
    age: 14,
    dateOfBirth: '2010-01-25',
    gender: 'Male',
  },
];

export const getStudents = (): Student[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(stored);
};

export const saveStudents = (students: Student[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

export const addStudent = (student: Student): Student[] => {
  const students = getStudents();
  students.push(student);
  saveStudents(students);
  return students;
};

export const updateStudent = (id: string, updatedStudent: Student): Student[] => {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index !== -1) {
    students[index] = updatedStudent;
    saveStudents(students);
  }
  return students;
};

export const deleteStudent = (id: string): Student[] => {
  const students = getStudents();
  const filtered = students.filter((s) => s.id !== id);
  saveStudents(filtered);
  return filtered;
};

export const isRollNumberUnique = (rollNumber: string, excludeId?: string): boolean => {
  const students = getStudents();
  return !students.some((s) => s.rollNumber === rollNumber && s.id !== excludeId);
};
