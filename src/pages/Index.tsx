import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { StudentForm } from '@/components/StudentForm';
import { StudentTable } from '@/components/StudentTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, GraduationCap } from 'lucide-react';
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  isRollNumberUnique,
} from '@/lib/studentStorage';
import { StudentFormValues } from '@/lib/studentValidation';

const Index = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const handleAddStudent = (data: StudentFormValues) => {
    if (!isRollNumberUnique(data.rollNumber)) {
      toast.error('Roll number already exists');
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      rollNumber: data.rollNumber,
      class: data.class,
      age: data.age,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    };

    const updated = addStudent(newStudent);
    setStudents(updated);
    setIsDialogOpen(false);
    toast.success('Student added successfully');
  };

  const handleUpdateStudent = (data: StudentFormValues) => {
    if (!editingStudent) return;

    if (!isRollNumberUnique(data.rollNumber, editingStudent.id)) {
      toast.error('Roll number already exists');
      return;
    }

    const updatedStudent: Student = {
      id: editingStudent.id,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      rollNumber: data.rollNumber,
      class: data.class,
      age: data.age,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    };

    const updated = updateStudent(editingStudent.id, updatedStudent);
    setStudents(updated);
    setEditingStudent(null);
    setIsDialogOpen(false);
    toast.success('Student updated successfully');
  };

  const handleDeleteStudent = (id: string) => {
    const updated = deleteStudent(id);
    setStudents(updated);
    toast.success('Student deleted successfully');
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-card)]">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Manager</h1>
              <p className="text-muted-foreground">
                Manage student records with ease
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Students: <span className="font-semibold text-foreground">{students.length}</span>
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-[var(--shadow-hover)]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDeleteStudent}
        />

        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </DialogTitle>
              <DialogDescription>
                {editingStudent
                  ? 'Update the student information below.'
                  : 'Fill in the student information below. Fields marked with * are required.'}
              </DialogDescription>
            </DialogHeader>
            <StudentForm
              student={editingStudent || undefined}
              onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
