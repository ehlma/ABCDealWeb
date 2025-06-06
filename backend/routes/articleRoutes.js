import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // BRUK denne
import ArticleForm from "../models/ArticleForm.js";
import { createArticle, getArticles, getArticleById, updateArticle } from "../controllers/articleController.js";

const router = express.Router();

// POST med bildeopplasting + autentisering
router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    upload.single("image"),
    createArticle
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    upload.single("image"),
    async (req, res) => {
        try {
            const { title, intro, bodyText } = req.body;
            const updateFields = { title, intro, bodyText };

            if(!req) {
                updateFields.image = req.file.filename;
            }

            const updated = await ArticleForm.findByIdAndUpdate(
                req.params.id,
                updateFields,
                {new: true}
            );

            if (!updated) {
                return res.status(404).json({message: "Artikkel ikke funnet"});
            }

            res.json(updated);
        } catch (err) {
            res.status(500).json({message: "Serverfeil: " , error: err.message})
        }
    }
);

// GET for å hente artikler
router.get("/", getArticles);
router.get("/:id", getArticleById);

router.put("/:id", verifyToken, authorizeRoles("admin"), upload.single("image"), updateArticle);


export default router;
