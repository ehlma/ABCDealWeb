import express from "express";
import verifyToken from "../../middleware/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js"; // BRUK denne
import ArticleForm from "../../models/ArticleForm.js";
import { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } from "../../controllers/articleController.js";

const router = express.Router();

// POST med bildeopplasting + autentisering
router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    createArticle
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    upload.array("images", 5),
    async (req, res) => {
        try {
          console.log("BODY:", req.body);
          console.log("FILES:", req.files);
    
          const { title, intro, bodyText } = req.body;
          const updateFields = { title, intro, bodyText };
    
          if (req.files && req.files.length > 0) {
            updateFields.images = req.files.map((f) => f.filename);
          }
    
          const updated = await ArticleForm.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
          );
    
          if (!updated) {
            return res.status(404).json({ message: "Artikkel ikke funnet" });
          }
    
          res.json(updated);
        } catch (err) {
          console.error("PUT /:id error:", err); // logg feilen
          res.status(500).json({ message: "Serverfeil", error: err.message });
        }
      }
);

// GET for å hente artikler
router.get("/", getArticles);
router.get("/:id", getArticleById);

router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteArticle);



export default router;
