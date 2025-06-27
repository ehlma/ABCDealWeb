import express from "express";
import { submitContact } from "../controllers/contactController.js";

const router = express.Router();

// POST-rute for å sende inn kontaktskjema (åpen for alle)
router.post("/", submitContact);

export default router;