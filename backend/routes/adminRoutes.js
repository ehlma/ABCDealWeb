import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/admin-data', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({message: "Only admins can see this", user: req.user});
});

export default router;