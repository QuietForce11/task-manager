import express from "express";
import { signup, login, getMe } from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.get("/me", authenticate, asyncHandler(getMe));

export default router;
