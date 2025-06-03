import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { sendResetLink, setNewPassword } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", sendResetLink);
router.post("/set-new-password", setNewPassword);


export default router;