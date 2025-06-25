import express from 'express';
import { submitContact, getAllContacts } from '../../controllers/contactController.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { authorizeRoles } from '../../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/contact', submitContact);
router.get('/contact', verifyToken, authorizeRoles("admin"), getAllContacts);

export default router;