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
import activityRoutes from './routes/admin/activityRoutes.js';
import publicContactRoutes from './routes/publicContactRoutes.js';
import publicComplaintRoutes from './routes/publicComplaintRoutes.js';
import archivedContactRoutes from './routes/archivedContactRoutes.js';
import archivedComplaintRoutes from './routes/archivedComplaintRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // leser JSON i request-body

app.use("/uploads", express.static("uploads"));


// Ruter for API-endepunkter
// ruten til test-route(?)
app.use('/api/auth', authRoutes);
// protected route
app.use('/api/protected', protectedRoutes);

// Admin-relaterte ruter (beskyttet via frontend ProtectedRoute og backend middleware)
// admin route
app.use('/api/admin', adminRoutes); // Generell admin-rute
// complaint route
app.use('/api/admin/complaints', complaintRoutes);
// contact route
app.use('/api/admin/contacts', contactRoutes);
app.use('/api/admin/activity', activityRoutes);
// user route
app.use('/api/articles', articleRoutes);
app.use('/api/settings', userRoutes);

// Offentlig kontaktskjema/reklamasjon rute (ingen autentisering nødvendig)
app.use('/api/contact', publicContactRoutes);
app.use('/api/complaints', publicComplaintRoutes);

// Ruter for arkiverte kontaktskjema/reklamasjoner (kun admin)
app.use('/api/admin/archived/contacts', archivedContactRoutes);
app.use('/api/admin/archived/complaints', archivedComplaintRoutes);


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