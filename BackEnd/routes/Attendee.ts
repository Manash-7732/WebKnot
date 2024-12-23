import express from "express";
import attendeeController from "../controllers/AttendeeController";

const router = express.Router();

router.post("/attendee/add", attendeeController.addAttendee);
router.delete("/attendee/delete", attendeeController.deleteAttendee);
router.get("/attendee/all/:eventId", attendeeController.getAttendees);

export default router;
