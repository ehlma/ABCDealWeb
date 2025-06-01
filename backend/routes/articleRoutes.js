import express from "express";
import { createArticle } from "../controllers/articleController";
import verifyToken from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/articles", verifyToken, authorizeRoles("admin"), createArticle);

export default router;