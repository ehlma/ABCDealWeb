import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { get } from 'mongoose';
import { getAllArchivedContacts } from '../controllers/contactController.js';
const router = express.Router();

// GET-rute for å hente arkiverte kontaktskjemaer (admin only)
router.get("/", verifyToken, authorizeRoles("admin"), getAllArchivedContacts);

export default router;