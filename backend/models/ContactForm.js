import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNum: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String}, // valgfri URL eller filnavn
    createdAt: {type: Date, default: Date.now},
    status: {
        type: String,
        enum: ["new", "pending", "resolved"],
        default: "new"
    }
});

export default mongoose.model('ContactForm', contactFormSchema);