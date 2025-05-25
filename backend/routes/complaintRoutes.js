import express from 'express';
import { getAllComplaints, submitComplaint } from '../controllers/complaintController.js';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/complaints', submitComplaint);

router.get('/complaints', verifyToken, authorizeRoles("admin"), getAllComplaints);

export default router;