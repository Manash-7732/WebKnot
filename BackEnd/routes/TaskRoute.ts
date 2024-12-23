import express from "express";
import eventController from "../controllers/tasksController";

const router = express.Router();

router.post("/task/create", eventController.createTask);
router.get("/task/all/:eventId", eventController.getTasksForEvent);
router.put("/task/update/:id", eventController.updateTaskStatus);

export default router;
