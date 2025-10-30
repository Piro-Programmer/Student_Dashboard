# Student Manager

A professional React + TypeScript application for managing student records with full CRUD operations, search, sort, and pagination capabilities.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete student records
- **Student Information**: First name, middle name, last name, roll number, class, age, date of birth, and gender
- **Search**: Real-time search across names, roll numbers, and classes
- **Sort**: Click column headers to sort by any field (ascending/descending)
- **Pagination**: Navigate through records with 5 students per page
- **Validation**: 
  - Age must be between 3 and 120
  - Roll numbers must be unique
  - All required fields validated with clear error messages
- **LocalStorage Persistence**: All data saved automatically in browser storage
- **Seeded Data**: Comes with 6 sample student records
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: User-friendly feedback for all actions
- **Confirmation Dialogs**: Safe delete operations with confirmation

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom design system
- **shadcn/ui** components for consistent UI
- **React Hook Form** with Zod validation
- **Lucide React** for icons
- **Sonner** for toast notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage

### Adding a Student

1. Click the "Add Student" button in the top right
2. Fill in the student information form
3. Required fields are marked with *
4. Click "Add Student" to save

### Editing a Student

1. Click the edit icon (pencil) in the Actions column
2. Update the student information
3. Click "Update Student" to save changes

### Deleting a Student

1. Click the delete icon (trash) in the Actions column
2. Confirm the deletion in the dialog
3. The student record will be permanently removed

### Searching Students

- Use the search bar to filter students by name, roll number, or class
- Search updates in real-time as you type

### Sorting Students

- Click on any column header to sort by that field
- Click again to reverse the sort order
- Current sort field and direction indicated by arrow (↑↓)

### Pagination

- Navigate through pages using Previous/Next buttons
- Shows current page and total pages
- Displays record count information

## Data Structure

Each student record contains:

```typescript
{
  id: string;              // Unique identifier
  firstName: string;       // Required
  middleName?: string;     // Optional
  lastName: string;        // Required
  rollNumber: string;      // Required, unique
  class: string;          // Required (e.g., "10-A")
  age: number;            // Required (3-120)
  dateOfBirth: string;    // Required (YYYY-MM-DD)
  gender: 'Male' | 'Female' | 'Other'; // Required
}
```

## Validation Rules

- **First Name**: Required, max 50 characters
- **Middle Name**: Optional, max 50 characters
- **Last Name**: Required, max 50 characters
- **Roll Number**: Required, unique, max 20 characters
- **Class**: Required, max 20 characters
- **Age**: Required, 3-120
- **Date of Birth**: Required, valid date
- **Gender**: Required, one of Male/Female/Other

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn UI components
│   ├── StudentForm.tsx  # Add/Edit form component
│   └── StudentTable.tsx # Table with search, sort, pagination
├── lib/
│   ├── studentStorage.ts    # LocalStorage utilities
│   ├── studentValidation.ts # Zod schema
│   └── utils.ts            # Helper functions
├── pages/
│   └── Index.tsx        # Main application page
├── types/
│   └── student.ts       # TypeScript interfaces
├── App.tsx              # App wrapper with routing
└── main.tsx            # Application entry point
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Testing

The application includes comprehensive validation and error handling. To manually test:

1. Try adding a student with invalid age (< 3 or > 120)
2. Try adding a student with duplicate roll number
3. Try adding a student with missing required fields
4. Test search functionality with various terms
5. Test sorting on different columns
6. Test pagination navigation
7. Test edit and delete operations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## LocalStorage

All student data is stored in browser's localStorage under the key `students`. Data persists across sessions. To reset:

```javascript
localStorage.removeItem('students');
```

## License

This project is built with [Lovable](https://lovable.dev).

## Support

For issues or questions, please refer to the [Lovable documentation](https://docs.lovable.dev/).
