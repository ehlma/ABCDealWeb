import express from "express";
import verifyToken from "../../middleware/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";
import {
	createArticle,
	getArticles,
	getArticleById,
	updateArticle,
	deleteArticle,
} from "../../controllers/articleController.js";

const router = express.Router();

router.post(
	"/",
	verifyToken,
	authorizeRoles("admin"),
	createArticle
);

router.get("/", getArticles);

router.get("/:id", getArticleById);

router.put(
	"/:id",
	verifyToken,
	authorizeRoles("admin"),
	updateArticle
);

router.delete(
	"/:id",
	verifyToken,
	authorizeRoles("admin"),
	deleteArticle
);

export default router;