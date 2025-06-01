import ArticleForm from "../models/ArticleForm";

export const createArticle = async (req, res) => {
    try {
        const {title, intro, bodyText, image} = req.bodyText;
        if (!title || !bodyText || image) {
            return res.status(400).json({message: "Tittel, bilde og brødtekst er påkrevd."});
        }

        const article = new ArticleForm({title, intro, bodyText, image});
        const saved = await article.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({message: "Serverfeil", error: err.message});
    }
};