import ComplaintForm from "../models/ComplaintForm.js";

// POST /api/complaints
export const submitComplaint = async (req, res) => {
  try {
    console.log("--- REQ.BODY ---", req.body);
    console.log("--- REQ.FILES ---", req.files);

    const { name, email, phoneNum, regNum, description, visibleDamage } =
      req.body;

    const imageUrl = req.files.image ? req.files.image[0].path : undefined;
    const documentationUrls = req.files.documentation
      ? req.files.documentation.map((file) => file.path)
      : [];

    const complaint = new ComplaintForm({
      name,
      email,
      phoneNum,
      regNum,
      description,
      visibleDamage,
      image: imageUrl,
      documentation: documentationUrls,
    });

    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    console.error("Error submitting complaint: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/complaints (for admin)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await ComplaintForm.find({
      $or: [{ isArchived: false }, { isArchived: { $exists: false } }],
    }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET/api/complaints/archived (for admin)
export const getAllArchivedComplaints = async (req, res) => {
  try {
    const contacts = await ComplaintForm.find({ isArchived: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching archived complaints: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
