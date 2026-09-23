import nodemailer from "nodemailer";

// POST /api/contact
export const submitContact = async (req, res) => {
    try {
        const { name, email, phoneNum, text } = req.body;

        if (!name || !email || !phoneNum || !text) {
            return res.status(400).json({
                message: "Alle feltene må fylles ut.",
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"3S Bobil & Caravan" <${process.env.EMAIL_USER}>`,
            to: "tommy@3sbc.no",

            // Når Tommy trykker "Svar", svarer han personen
            // som fylte ut kontaktskjemaet.
            replyTo: email,

            subject: `Ny henvendelse fra ${name}`,

            text: `
Ny henvendelse fra kontaktskjemaet på 3S Bobil & Caravan.

Navn: ${name}
E-post: ${email}
Telefon: ${phoneNum}

Melding:
${text}
      `,
        });

        return res.status(200).json({
            message: "Meldingen ble sendt.",
        });
    } catch (error) {
        console.error("Feil ved sending av kontaktskjema:", error);

        return res.status(500).json({
            message: "Kunne ikke sende meldingen.",
        });
    }
};


// VED BRUK AV KONTAKTSKJEMA PÅ ADMINPANELET: 
/* 
import ContactForm from "../models/ContactForm.js";

// POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, phoneNum, text, image } = req.body;

    const contact = new ContactForm({
      name,
      email,
      phoneNum,
      text,
      image,
    });

    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/contact (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.find({
      $or: [{ isArchived: false }, { isArchived: { $exists: false } }],
    }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact forms: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/contact/archived (admin only)
export const getAllArchivedContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.find({ isArchived: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching archived contact forms: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
*/
