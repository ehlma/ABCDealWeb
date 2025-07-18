import ArticleForm from "../models/ArticleForm.js";
import { cloudinary } from "../utils/cloudinary.js";

export const createArticle = async (req, res) => {
    try {
        const { title, intro, bodyText, images } = req.body;

        if (!title || !bodyText || !images || !images.length) {
          return res.status(400).json({ message: "Tittel, bilde og brødtekst er påkrevd." });
        }

        const footerText = `
            <p class="mt-8 border-t pt-4 text-sm text-gray-600">
            For mer informasjon, kontakt oss på <strong>+47 999 99 999</strong> eller via vårt <a href="/contact" class="text-blue-600 underline">kontaktskjema</a>.
            </p>
        `;
  
        const article = new ArticleForm({
            title,
            intro,
            bodyText: `<p>${bodyText}</p>` + footerText,
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
  
        const footerText = `
        <p class="mt-8 border-t pt-4 text-sm text-gray-600">
        For mer informasjon, kontakt oss på <strong>+47 999 99 999</strong> eller via vårt <a href="/contact" class="text-blue-600 underline">kontaktskjema</a>.
        </p>
      `;
      
      const updateFields = {
        title,
        intro,
        bodyText: `${bodyText}${footerText}`,
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

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ArticleForm.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Artikkel ikke funnet" });

        res.json({ message: "Artikkel slettet" });
    } catch (err) {
        res.status(500).json({ message: "Noe gikk galt" });
    }
};

