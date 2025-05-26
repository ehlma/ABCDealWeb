import express from 'express';
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Alle routes krever admin
router.use(verifyToken, authorizeRoles('admin'));

router.get('/users', getAllUsers);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

export default router;
