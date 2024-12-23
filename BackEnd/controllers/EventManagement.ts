import db from "../config/db";
import { Request, Response } from "express";

export default {
  createEvent: async (req: Request, res: Response): Promise<any> => {
    try {
      const { name, description, location, date } = req.body;

      if (!name || !description || !location) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newEvent = await db.event.create({
        data: {
          name,
          description,
          location,
          date: !date ? new Date() : new Date(date),
        },
      });

      return res
        .status(201)
        .json({ message: "Event created successfully.", event: newEvent });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create event." });
    }
  },

  getAllEvents: async (req: Request, res: Response): Promise<any> => {
    try {
      const events = await db.event.findMany();
      return res.status(200).json(events);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch events." });
    }
  },

  updateEvent: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const { name, description, location, date } = req.body;

      const previousEventDetails = await db.event.findUnique({
        where: {
          id: Number(id),
        },
      });

      const updatedEvent = await db.event.update({
        where: { id: parseInt(id) },
        data: {
          name: !name ? previousEventDetails?.name : name,
          description: !description
            ? previousEventDetails?.description
            : description,
          location: !location ? previousEventDetails?.location : location,
          date: !date ? previousEventDetails?.date : date,
        },
      });

      return res
        .status(200)
        .json({ message: "Event updated successfully.", event: updatedEvent });
    } catch (error) {
      console.error(error);

      if ((error as any).code === "P2025") {
        return res.status(404).json({ message: "Event not found." });
      }

      return res.status(500).json({ message: "Failed to update event." });
    }
  },

  deleteEvent: async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      await db.event.delete({ where: { id: parseInt(id) } });

      return res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
      console.error(error);

      if ((error as any).code === "P2025") {
        return res.status(404).json({ message: "Event not found." });
      }

      return res.status(500).json({ message: "Failed to delete event." });
    }
  },
};
