import Activity from "../models/Activity.js";

export const getRecentActivity = async (req, res) => {
    try {
        const activities = await Activity.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(activities);
    } catch (err) {
        res.status(500).json({
            message: "Kunne ikke hente nylig aktivitet.",
            error: err.message,
        });
    }
};