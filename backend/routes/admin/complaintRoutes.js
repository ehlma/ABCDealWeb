import express from 'express';
import { getAllComplaints, submitComplaint } from '../../controllers/complaintController.js';
import verifyToken from '../../middleware/authMiddleware.js';
import { authorizeRoles } from '../../middleware/roleMiddleware.js';
import complaintForm from '../../models/ComplaintForm.js';

const router = express.Router();

// router.post('/complaints', submitComplaint);

// router.get('/complaints', verifyToken, authorizeRoles("admin"), getAllComplaints);

// router.patch('/complaints/:id', verifyToken, authorizeRoles("admin"), async (req, res) => {
//     try {
//         const {status} = req.body;
//         if (!["new", "pending", "resolved"].includes(status)) {
//             return res.status(400).json({message: "Ugyldig statusverdi"});
//         }

//         const updated = await complaintForm.findByIdAndUpdate(
//             req.params.id,
//             {status},
//             {new: true}
//         );

//         if (!updated) return res.status(404).json({message: "Reklamasjon ikke funnet"});
//         res.json(updated);
//     } catch (error) {
//         console.error("Feil ved PATCH: ", error);
//         res.status(500).json({message: "Serverfeil ", error: error.message});
//     }
// });

router.get('/', verifyToken, authorizeRoles("admin"), getAllComplaints);

router.patch('/:id', verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const {status} = req.body;
        const updated = await complaintForm.findByIdAndUpdate(
            req.params.id,
            {status: status},
            {new: true}
        );

        if (!updated) return res.status(404).json({message: "Reklamasjon ikke funnet."});
        res.json(updated);
    } catch (error) {
        res.status(500).json({message: "Serverfeil ved oppdatering.", error: error.message});
    }
});

export default router;