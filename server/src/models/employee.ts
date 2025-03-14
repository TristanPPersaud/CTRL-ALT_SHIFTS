import { Schema, model, type Document } from 'mongoose';

interface EmployeeDocument extends Document {
  employee_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  job: string;
  company_id: number;
  access_level: boolean;
}

const employeeSchema = new Schema<EmployeeDocument>({
   employee_id: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    job: { type: String, required: true },
    company_id: { type: Number, required: true },
    access_level: { type: Boolean, required: true }
});

const Employee = model<EmployeeDocument>('Employee', employeeSchema);
export { Employee, EmployeeDocument };

// Function to define associations AFTER both models are imported
export const associateEmployee = async () => {
  const { Employer } = await import('./employer.js');

employeeSchema.virtual('employer', {
    ref: 'Employer',
    localField: 'company_id',
    foreignField: 'id',
    justOne: true
  });
}
