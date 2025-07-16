import ComplaintForm from "../models/ComplaintForm.js";

// POST /api/complaints
export const submitComplaint = async (req, res) => {
    try {
        const {
            name,
            email,
            phoneNum,
            regNum,
            description,
            visibleDamage,
        } = req.body;

        const imageFilename = req.files.image ? req.files.image[0].filename : undefined;
        const documentationFilenames = req.files.documentation ? req.files.documentation.map(file => file.filename) : [];

        const complaint = new ComplaintForm({
            name,
            email,
            phoneNum,
            regNum,
            description,
            image: imageFilename,
            visibleDamage,
            documentation: documentationFilenames
        });

        const savedComplaint = await complaint.save();
        res.status(201).json(savedComplaint);
    } catch (error) {
        console.error("Error submitting complaint: ", error);
        res.status(500).json({message: "Server error"});
    }
};

// GET /api/complaints (for admin)
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await ComplaintForm.find().sort({createdAt: -1}); // nyeste først
        res.status(200).json(complaints);
    } catch (error) {
        console.error("Error fetching complaints: ", error);
        res.status(500).json({message: "Server error"});
    }
};

