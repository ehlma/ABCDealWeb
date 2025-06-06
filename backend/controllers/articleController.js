import ArticleForm from "../models/ArticleForm.js";

export const createArticle = async (req, res) => {
    try {
        const {title, intro, bodyText } = req.body;
        const image = req.file?.filename;

        if (!title || !bodyText || !image) {
            return res.status(400).json({message: "Tittel, bilde og brødtekst er påkrevd."});
        }

        const article = new ArticleForm({
            title, 
            intro, 
            bodyText, 
            image
        });

        const saved = await article.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({message: "Serverfeil", error: err.message});
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
