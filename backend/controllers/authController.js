import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from "nodemailer";

// registrering
export const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password, role} = req.body;
        const emailClean = email.trim().toLowerCase();
        // sjekk om bruker allerede finnes
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already exists"});

        // hash passord
        const passwordHash = await bcrypt.hash(password, 10); // nb: hvorfor 10?

        // lagre ny bruker
        const newUser = new User({
            firstName,
            lastName,
            email: emailClean,
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

export const sendResetLink = async (req, res) => {

    const { email } = req.body;
  
    try {
      const user = await User.findOne({
        email: email.trim().toLowerCase() 
      });
  
      if (!user) {
        return res.status(404).json({ message: "E-post ikke funnet." });
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_RESET_SECRET,
        { expiresIn: "1h" }
      );
  
      const resetLink = `http://localhost:5173/reset-password/${token}`;
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
  
      await transporter.sendMail({
        from: `"ABC Deal" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Tilbakestilling av passord",
        text: `Hei!\n\nKlikk på lenken under for å lage nytt passord (gyldig i 1 time):\n\n${resetLink}`
      });
  
      res.json({ message: "Lenke sendt til e-post." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Noe gikk galt." });
    }
  };

  export const setNewPassword = async (req, res) => {
    const { token, password } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: "Bruker ikke funnet" });
  
      user.passwordHash = await bcrypt.hash(password, 10);
      await user.save();
  
      res.json({ message: "Passord oppdatert" });
    } catch (err) {
      return res.status(400).json({ message: "Ugyldig eller utløpt lenke" });
    }
};

