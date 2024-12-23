import express from "express";
import dotenv from "dotenv";
import db from "../config/db";
import userRouter from "../routes/user";
import eventRouter from "../routes/eventManagement";
import attendee from "../routes/Attendee";
import TaskRoute from "../routes/taskRoute";
import cors from "cors";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/regi", userRouter);
app.use(eventRouter);
app.use("/attend", attendee);
app.use(TaskRoute);

async function main() {
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
