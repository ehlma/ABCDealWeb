import express from "express";
import { submitComplaint } from "../controllers/complaintController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// POST-rute for innsending (åpen for alle)
router.post(
    "/",
    upload.fields([
        {name: "image", maxCount: 1},
        {name: "documentation", maxCount: 10},
    ]),
    submitComplaint
);

export default router;