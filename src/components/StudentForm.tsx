import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema, StudentFormValues } from '@/lib/studentValidation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/types/student';

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: StudentFormValues) => void;
  onCancel: () => void;
}

export const StudentForm = ({ student, onSubmit, onCancel }: StudentFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: student
      ? {
          firstName: student.firstName,
          middleName: student.middleName || '',
          lastName: student.lastName,
          rollNumber: student.rollNumber,
          class: student.class,
          age: student.age,
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
        }
      : {
          gender: 'Male',
        },
  });

  const gender = watch('gender');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Enter first name"
            className={errors.firstName ? 'border-destructive' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            {...register('middleName')}
            placeholder="Enter middle name"
          />
          {errors.middleName && (
            <p className="text-sm text-destructive">{errors.middleName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Enter last name"
            className={errors.lastName ? 'border-destructive' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rollNumber">Roll Number *</Label>
          <Input
            id="rollNumber"
            {...register('rollNumber')}
            placeholder="Enter roll number"
            className={errors.rollNumber ? 'border-destructive' : ''}
          />
          {errors.rollNumber && (
            <p className="text-sm text-destructive">{errors.rollNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="class">Class *</Label>
          <Input
            id="class"
            {...register('class')}
            placeholder="e.g., 10-A"
            className={errors.class ? 'border-destructive' : ''}
          />
          {errors.class && (
            <p className="text-sm text-destructive">{errors.class.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            {...register('age')}
            placeholder="Enter age"
            className={errors.age ? 'border-destructive' : ''}
          />
          {errors.age && (
            <p className="text-sm text-destructive">{errors.age.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className={errors.dateOfBirth ? 'border-destructive' : ''}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select
            value={gender}
            onValueChange={(value) => setValue('gender', value as 'Male' | 'Female' | 'Other')}
          >
            <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};
