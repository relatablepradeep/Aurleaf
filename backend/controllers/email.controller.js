import {User} from '../models/user.models.js';

export const saveReview = async (req, res) => {
    try {
        console.log("Received request:", req.body); // ✅ Log incoming request

        const {  } = req.body;
        if (!email) {
            console.error("❌ Email is missing in request");
            return res.status(400).json({ error: "Email is required" });
        }

        // ✅ Check if email already exists
        const existingEmail = await Email.findOne({ email });
        if (existingEmail) {
            console.log("⚠️ Email already exists:", email);
            return res.status(400).json({ error: "Email already exists!" });
        }

        const newEmail = new Email({ email });
        await newEmail.save();

        console.log("✅ Email saved successfully:", email);
        res.status(200).json({ success: "Email saved successfully" });

    } catch (error) {
        console.error("🔥 Backend Error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
