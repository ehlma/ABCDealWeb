import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const articleSchema = new mongoose.Schema({
    articleId: { type: String, default: uuidv4, unique: true },
    title: { type: String, required: true },
    intro: { type: String }, // Valgfritt
    bodyText: { type: String, required: true },
    images: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ArticleForm", articleSchema);
