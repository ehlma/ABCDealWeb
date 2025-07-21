import express from 'express';
import { getAllArchivedComplaints } from '../controllers/complaintController.js';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// GET-rute for å hente kun arkiverte reklamasjoner (admin only)
router.get("/", verifyToken, authorizeRoles("admin"), getAllArchivedComplaints);

export default router;