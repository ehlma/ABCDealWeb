import mongoose from "mongoose";

const complaintFormSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNum: {type: String, required: true},
    regNum: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}, // bilde av skaden
    visibleDamage: {type: Boolean, required: false},
    documentation: {type: String}, // flere bilder eller lenker
    createdAt: {type: Date, required: Date.now}
});

export default mongoose.model('ComplaintForm', complaintFormSchema);