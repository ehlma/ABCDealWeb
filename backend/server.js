import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // leser JSON i request-body

// test-route
app.get('/api/ping', (req, res) => {
    res.json({ message: "Server is running" });
});

// ruten til test-route(?)
app.use('/api/auth', authRoutes);

// koble til mongoDB og start server
const PORT = process.env.PORT || 5050;
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