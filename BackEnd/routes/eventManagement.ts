import express from "express";
import eventController from "../controllers/EventManagement";

const router = express.Router();

router.post("/event/create", eventController.createEvent);
router.delete("/event/delete/:id", eventController.deleteEvent);
router.get("/event/all", eventController.getAllEvents);
router.put("/event/update/:id", eventController.updateEvent);

export default router;
