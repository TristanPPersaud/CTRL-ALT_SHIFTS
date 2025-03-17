import { Employee } from '../models/employee';
import { Employer } from '../models/employer';
import { Schedule } from '../models/schedule';

export const resolvers = {
  Query: {
    employees: async () => await Employee.find(),
    employee: async (_: any, { id }: { id: string }) => await Employee.findById(id),

    employers: async () => await Employer.find(),
    employer: async (_: any, { id }: { id: string }) => await Employer.findById(id),

    schedules: async () => await Schedule.find(),
    schedule: async (_: any, { id }: { id: string }) => await Schedule.findById(id),
  },

  Mutation: {
    addEmployee: async (
      _: any,
      { email, password, first_name, last_name, job, company_id, access_level }:
      { email: string, password: string, first_name: string, last_name: string, job: string, company_id: number, access_level: boolean }
    ) => {
      const newEmployee = new Employee({ email, password, first_name, last_name, job, company_id, access_level });
      await newEmployee.save();
      return newEmployee;
    },

    addEmployer: async (
      _: any,
      { first_name, last_name, business_name, admin_id }:
      { first_name: string, last_name: string, business_name: string, admin_id: number }
    ) => {
      const newEmployer = new Employer({ first_name, last_name, business_name, admin_id });
      await newEmployer.save();
      return newEmployer;
    },

    addSchedule: async (
      _: any,
      { job_id, job_title, employee_id, employee_name, date, start_time, end_time }:
      { job_id: number, job_title: string, employee_id: number, employee_name: string, date: string, start_time: string, end_time: string }
    ) => {
      const newSchedule = new Schedule({ job_id, job_title, employee_id, employee_name, date, start_time, end_time });
      await newSchedule.save();
      return newSchedule;
    },

    updateEmployee: async (
      _: any,
      { id, email, first_name, last_name, job, company_id, access_level }:
      { id: string, email?: string, first_name?: string, last_name?: string, job?: string, company_id?: number, access_level?: boolean }
    ) => {
      return await Employee.findByIdAndUpdate(
        id,
        { email, first_name, last_name, job, company_id, access_level },
        { new: true }
      );
    },

    updateEmployer: async (
      _: any,
      { id, first_name, last_name, business_name, admin_id }:
      { id: string, first_name?: string, last_name?: string, business_name?: string, admin_id?: number }
    ) => {
      return await Employer.findByIdAndUpdate(
        id,
        { first_name, last_name, business_name, admin_id },
        { new: true }
      );
    },

    updateSchedule: async (
      _: any,
      { id, job_id, job_title, employee_id, employee_name, date, start_time, end_time }:
      { id: string, job_id?: number, job_title?: string, employee_id?: number, employee_name?: string, date?: string, start_time?: string, end_time?: string }
    ) => {
      return await Schedule.findByIdAndUpdate(
        id,
        { job_id, job_title, employee_id, employee_name, date, start_time, end_time },
        { new: true }
      );
    },

    deleteEmployee: async (_: any, { id }: { id: string }) => {
      const result = await Employee.findByIdAndDelete(id);
      return result !== null;
    },

    deleteEmployer: async (_: any, { id }: { id: string }) => {
      const result = await Employer.findByIdAndDelete(id);
      return result !== null;
    },

    deleteSchedule: async (_: any, { id }: { id: string }) => {
      const result = await Schedule.findByIdAndDelete(id);
      return result !== null;
    },
  },

  Employee: {
    employer: async (employee: any) => await Employer.findById(employee.company_id),
  },

  Employer: {
    employees: async (employer: any) => await Employee.find({ company_id: employer._id }),
  },
};