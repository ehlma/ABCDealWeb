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
