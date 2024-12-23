import db from "../config/db";
import { Request, Response } from "express";

export default {
  addAttendee: async (req: Request, res: Response): Promise<any> => {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ message: "User ID and Event ID are required" });
    }

    try {
      const event = await db.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            connect: { id: userId },
          },
        },
      });

      res.status(201).json({ message: "User added as attendee", event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding attendee" });
    }
  },


  getAttendees: async (req: Request, res: Response): Promise<any> => {
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    try {
      const event = await db.event.findUnique({
        where: { id: parseInt(eventId) },
        include: {
          attendees: true,
        },
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json(event.attendees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving attendees" });
    }
  },

  deleteAttendee: async (req: Request, res: Response): Promise<any> => {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ message: "User ID and Event ID are required" });
    }

    try {
      const event = await db.event.update({
        where: { id: parseInt(eventId) },
        data: {
          attendees: {
            disconnect: { id: parseInt(userId) },
          },
        },
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      return res
        .status(200)
        .json({ message: "User removed from event", event });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error removing attendee" });
    }
  },
};
