import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const activitySchema = new mongoose.Schema({
    activityId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["article", "user"],
    },
    action: {
        type: String,
        required: true,
        enum: ["created", "updated", "deleted"],
    },
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Activity", activitySchema);