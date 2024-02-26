import express from "express";
import authRoutes from "./auth.route.js";
import ConversationalRouter from "./conversation.route.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", ConversationalRouter);

export default router;
