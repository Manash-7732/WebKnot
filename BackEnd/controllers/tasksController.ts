import db from "../config/db"
import { Request, Response } from "express";


export default {
    createTask : async (req:Request, res:Response): Promise<any> => {
        const { title, description, eventId } = req.body;
      
      
        if (!title || !description || !eventId) {
          return res.status(400).json({ message: 'Title, description, and eventId are required' });
        }
      
        try {
         
          const task = await db.task.create({
            data: {
              title,
              description,
              eventId,
            },
          });
      
          res.status(201).json({ message: 'Task created successfully', task });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating task' });
        }
      },

      getTasksForEvent : async (req:Request, res:Response): Promise<any> => {
        const { eventId } = req.params;
      
        if (!eventId) {
          return res.status(400).json({ message: 'Event ID is required' });
        }
      
        try {
          const tasks = await db.task.findMany({
            where: { eventId: parseInt(eventId) },
          });
      
          if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for this event' });
          }
      
          res.status(200).json(tasks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error retrieving tasks' });
        }
      },
      updateTaskStatus : async (req:Request, res:Response): Promise<any> => {
        const { taskId, status } = req.body;
      
        if (!taskId || !status) {
          return res.status(400).json({ message: 'Task ID and status are required' });
        }
      
        try {
          const task = await db.task.update({
            where: { id: parseInt(taskId) },
            data: { status },
          });
      
          if (!task) {
            return res.status(404).json({ message: 'Task not found' });
          }
      
          res.status(200).json({ message: 'Task status updated successfully', task });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating task status' });
        }
      }
}