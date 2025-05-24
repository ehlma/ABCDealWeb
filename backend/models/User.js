import mongoose, { mongo } from "mongoose";
import { v4 as uuidv4 } from "uuid";


const userSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true, 
        unique: true,
        default: uuidv4, // genererer unik id automatisk (i backend: npm install uuid)    
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    role: {type: String, required: true},
    createdAt: {type: String, default: Date.now},
});

export default mongoose.model('User', userSchema);