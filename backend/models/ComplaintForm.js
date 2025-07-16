import mongoose from "mongoose";

const complaintFormSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNum: {type: String, required: true},
    regNum: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: false}, // bilde av skaden
    visibleDamage: {type: Boolean, default: false}, // valgfri
    documentation: [{type: String}], // array med flere bilder eller lenker
    createdAt: {type: Date, default: Date.now},
    status: {
        type: String,
        enum: ["new", "pending", "resolved"],
        default: "new"
    }
});

export default mongoose.model('ComplaintForm', complaintFormSchema);