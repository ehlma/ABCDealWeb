import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import adminRoutes from './routes/admin/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import complaintRoutes from './routes/admin/complaintRoutes.js';
import contactRoutes from './routes/admin/contactRoutes.js';
import articleRoutes from './routes/admin/articleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // leser JSON i request-body

app.use("/uploads", express.static("uploads"));


// ruten til test-route(?)
app.use('/api/auth', authRoutes);
// protected route
app.use('/api/protected', protectedRoutes);
// admin route
app.use('/api/admin', adminRoutes);
// complaint route
app.use('/api', complaintRoutes);
// contact route
app.use('/api', contactRoutes);
// user route
app.use('/api/settings', userRoutes);
app.use('/api/articles', articleRoutes);

// test-route
app.get('/api/ping', (req, res) => {
    res.json({ message: "Server is running" });
});

// koble til mongoDB og start server
const PORT = process.env.PORT || 5050;
console.log("MongoURI: ", process.env.MONGO_URI);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed: ", err.message);
    });