import express from 'express';
import type { Request, Response } from 'express';
import Data from '../data.js';
import { authenticateToken } from '../../middleware/auth';

const router = express.Router();

// Apply authenticateToken middleware to protect the routes
router.use(authenticateToken);

// View schedule by week
router.get('/weekly', async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;
        const employee_id = req.employee.id;

        // Set default values for startDate and endDate if not provided
        const { firstDay, lastDay } = Data.getCurrentWeek();
        const start = startDate ? new Date(startDate as string) : firstDay;
        const end = endDate ? new Date(endDate as string) : lastDay;

        console.log(`Fetching schedule for employee: ${employee_id} from ${startDate} to ${endDate}`);

        // Ensure dates are provided
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        // Fetch schedule from MongoDB
        const dbSchedule = await Data.getSchedule(employee_id, start, end);

        return res.json(dbSchedule);
    } catch (err: any) {
        console.error('Error fetching schedule:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// View schedule for the day
router.get('/daily', async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
      const employee_id = req.employee.id;
  
      // Set default value for date if not provided
      const currentDate = Data.getCurrentDate();
      const day = date ? new Date(date as string) : currentDate;
  
      console.log(`Fetching schedule for employee: ${employee_id} for ${day}`);
  
      // Fetch schedule from MongoDB
      const dbSchedule = await Data.dailySchedule(employee_id, day);
  
      return res.json(dbSchedule);
    } catch (err: any) {
      console.error('Error fetching schedule:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });

export { router as employeeRouter };