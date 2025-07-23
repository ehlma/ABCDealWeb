import ArticleForm from "../models/ArticleForm.js";
import { cloudinary } from "../utils/cloudinary.js";

export const createArticle = async (req, res) => {
    try {
        const { title, intro, bodyText, images } = req.body;

        if (!title || !bodyText || !images || !images.length) {
          return res.status(400).json({ message: "Tittel, bilde og brødtekst er påkrevd." });
        }
  
        const article = new ArticleForm({
            title,
            intro,
            bodyText,
            images,
        });
  
        const saved = await article.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Feil ved bildeopplasting:", err);
        res.status(500).json({ message: "Serverfeil", error: err.message });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await ArticleForm.find().sort({createdAt: -1});
        res.json(articles);
    } catch (err) {
        res.status(500).json({message: "Kunne ikke hente artikler."});
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, intro, bodyText } = req.body;
      
      const updateFields = {
        title,
        intro,
        bodyText
      };
  
        if (req.files && req.files.length > 0) {
            updateFields.images = req.files.map((file) => file.filename);
        }
  
        const updated = await ArticleForm.findByIdAndUpdate(id, updateFields, { new: true });
  
        if (!updated) {
            return res.status(404).json({ message: "Artikkel ikke funnet" });
        }
  
        res.json(updated);

        } catch (err) {
            res.status(500).json({ message: "Serverfeil", error: err.message });
        }
};
  

export const getArticleById = async (req, res) => {
    try {
        const article = await ArticleForm.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikkel ikke funnet" });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: "Serverfeil", error: err.message });
    }
};

// Delete article assigned pictures (in cloudinary)
export const deleteArticle = async (req, res) => {
    try {
      const { id } = req.params;
  
      const article = await ArticleForm.findById(id);
      if (!article) return res.status(404).json({ message: "Artikkel ikke funnet" });
  
      // Trygg filtrering og sletting
      const imagePublicIds = (article.images || [])
        .filter((url) => typeof url === "string") // ← unngå null/undefined
        .map((url) => {
          const match = url.match(/\/upload\/(?:v\d+\/)?abcdeal-artikler\/(.+)\.(jpg|jpeg|png|webp)/);
          return match ? `abcdeal-artikler/${match[1]}` : null;
        })
        .filter(Boolean); // fjern null
  
      console.log("Sletter fra Cloudinary:", imagePublicIds);
  
      await Promise.all(
        imagePublicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
      );
  
      await ArticleForm.findByIdAndDelete(id);
      res.json({ message: "Artikkel og bilder slettet" });
  
    } catch (err) {
      console.error("Sletting feilet:", err);
      res.status(500).json({ message: "Noe gikk galt", error: err.message });
    }
  };
  

