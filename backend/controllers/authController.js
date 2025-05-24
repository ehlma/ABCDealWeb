import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// registrering
export const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, role} = req.body;

        // sjekk om bruker allerede finnes
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already exists"});

        // hash passord
        const passwordHash = await bcrypt.hash(password, 10);

        // lagre ny bruker
        const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash,
            role
        });

        await newUser.save();
        res.status(201).json({message: "User registered"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid e-mail or passowrd"});

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) return res.status(400).json({message: "Invalid e-mail or password"});

        const token = jwt.sign(
            {userId: user.userId, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.json({
            token,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};