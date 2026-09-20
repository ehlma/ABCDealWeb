import express from "express";
import multer from "multer";

import {
    submitContact,
    getAllContacts,
} from "../../controllers/contactController.js";

import verifyToken from "../../middleware/authMiddleware.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";

import ContactForm from "../../models/ContactForm.js";

import {
    contactStorage,
} from "../../config/cloudinary.js";


const router = express.Router();


/*
 * MULTER
 *
 * Tar imot filer fra kontaktskjemaet
 * og sender dem videre til Cloudinary.
 */

const upload = multer({
    storage: contactStorage,

    limits: {
        // Maks størrelse per fil: 10 MB
        fileSize: 10 * 1024 * 1024,

        // Maks totalt antall filer
        files: 11,
    },

    fileFilter: (req, file, cb) => {

        /*
         * Bilder av bobilen skal kun være bilder
         */
        if (file.fieldname === "vehicleImages") {

            const allowedImages = [
                "image/jpeg",
                "image/png",
                "image/webp",
            ];

            if (
                !allowedImages.includes(file.mimetype)
            ) {
                return cb(
                    new Error(
                        "Bilder må være JPG, PNG eller WEBP."
                    )
                );
            }
        }


        /*
         * Tetthetskontroll kan være
         * bilde eller PDF
         */
        if (
            file.fieldname ===
            "densityControlFile"
        ) {

            const allowedDocuments = [
                "application/pdf",
                "image/jpeg",
                "image/png",
                "image/webp",
            ];

            if (
                !allowedDocuments.includes(
                    file.mimetype
                )
            ) {
                return cb(
                    new Error(
                        "Tetthetskontroll må være PDF, JPG, PNG eller WEBP."
                    )
                );
            }
        }


        cb(null, true);
    },
});


/*
 * OFFENTLIG POST-ROUTE
 *
 * Ingen verifyToken her.
 * Kunden skal kunne sende inn skjema
 * uten å være logget inn.
 */

router.post(
    "/",

    upload.fields([
        {
            name: "densityControlFile",
            maxCount: 1,
        },
        {
            name: "vehicleImages",
            maxCount: 10,
        },
    ]),

    submitContact
);


/*
 * ADMIN
 */

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    getAllContacts
);


router.patch(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    async (req, res) => {
        try {
            const {
                status,
                isArchived,
            } = req.body;

            const updated =
                await ContactForm.findByIdAndUpdate(
                    req.params.id,

                    {
                        status,
                        isArchived,
                    },

                    {
                        new: true,
                    }
                );


            if (!updated) {
                return res.status(404).json({
                    message:
                        "Kontaktskjema ikke funnet.",
                });
            }


            res.json(updated);

        } catch (error) {
            console.error(
                "Feil ved PATCH på kontaktskjema:",
                error
            );

            res.status(500).json({
                message:
                    "Serverfeil ved oppdatering av kontaktskjema.",

                error: error.message,
            });
        }
    }
);


export default router;