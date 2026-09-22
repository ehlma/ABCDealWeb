import express from 'express';
import { registerUser, loginUser, sendResetLink, setNewPassword, refreshToken, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.post("/reset-password", sendResetLink);
router.post("/set-new-password", setNewPassword);

export default router;