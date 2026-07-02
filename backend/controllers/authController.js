import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from "nodemailer";
import { roles } from '../../frontend/src/constants/roles.js';

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

// Hjelpefunksjoner
const createAccessToken = (user) => {
  return jwt.sign(
    {userId: user.userId, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn: "2h"}
  )
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {userId: user.userId, role: user.role},
    process.env.JWT_REFRESH_SECRET,
    {expiresIn: "7d"}
  )
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
};

const getCookieValue = (cookieHeader, cookieName) => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));

  if (!targetCookie) return null;

  return decodeURIComponent(targetCookie.split("=")[1]);
};

// login
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid e-mail or passowrd"});

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) return res.status(400).json({message: "Invalid e-mail or password"});

        const token = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        setRefreshTokenCookie(res, refreshToken);

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

export const refreshToken = async (req, res) => {
  try {
    const tokenFromCookie = getCookieValue(req.headers.cookie, "refreshToken");

    if (!tokenFromCookie) {
      return res.status(401).json({message: "Ingen aktiv innlogging."});
    }

    const decoded = jwt.verify(tokenFromCookie, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({userId: decoded.userId});

    if (!user) {
      return res.status(401).json({message: "Bruker finnes ikke."});
    }

    const token = createAccessToken(user);

    return res.status(200).json({
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(401).json({message: "Ugyldig eller utløpt innlogging."});
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return res.status(200).json({message: "Logget ut."});
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

