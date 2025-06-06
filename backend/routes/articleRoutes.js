import express from "express";
import { createArticle, getArticles } from "../controllers/articleController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // BRUK denne

const router = express.Router();

// POST med bildeopplasting + autentisering
router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    upload.single("image"),
    createArticle
);

// GET for å hente artikler
router.get("/", getArticles);

export default router;
