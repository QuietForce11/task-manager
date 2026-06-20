import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import authenticate from "../middleware/authenticate.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.use(authenticate); // every task route requires login

router.get("/", asyncHandler(getTasks));
router.post("/", asyncHandler(createTask));
router.put("/:id", asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

export default router;
