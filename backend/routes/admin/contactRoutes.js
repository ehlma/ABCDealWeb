import express from 'express';
import { submitContact, getAllContacts } from '../../controllers/contactController.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { authorizeRoles } from '../../middleware/roleMiddleware.js';
import ContactForm from '../../models/ContactForm.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRoles("admin"), getAllContacts);

router.patch('/:id', verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const {status, isArchived} = req.body;

        const updated = await ContactForm.findByIdAndUpdate(
            req.params.id,
            {status: status, isArchived: isArchived},
            {new: true}
        );

        if (!updated) return res.status(404).json({message: "Kontaktskjema ikke funnet."});
        res.json(updated);
    } catch (error) {
        console.error("Feil ved PATCH på kontaktskjema: ", error);
        res.status(500).json({message: "Serverfeil ved oppdatering av kontaktskjema.", error: error.message});
    }
});

export default router;