import User from "../models/User.js";
import bcrypt from 'bcrypt';

// GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash');
        res.status(200).json(users);
    } catch {
        res.status(500).json({message : "Server error"});
    }
};

// POST /api/users
export const createUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, role} = req.body;

        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message: "Bruker finnes allerede."});

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User ({
            firstName,
            lastName,
            email,
            passwordHash,
            role
        });

        await user.save();
        res.status(201).json({message: "Bruker opprettet."});
    } catch (err) {
        res.status(500).json({message: "Server error."})
    }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
    try {
        const {firstName, lastName, email, role} = req.body;

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            {firstName, lastName, email, role},
            {new: true}
        );

        if (!updated) return res.status(404).json({message: "Bruker ikke funnet"});

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({message: "Bruker ikke funnet."});

        res.status(200).json({message: "Bruker slettet."});
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
};