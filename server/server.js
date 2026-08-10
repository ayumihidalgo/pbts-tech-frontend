import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  getDbPool,
  saveContactSubmission,
  getContactSubmissions,
  saveCareerApplication,
  getCareerApplications,
} from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadsDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: PDF, DOC, DOCX, PNG, JPG'));
    }
  },
});

// Routes

// 1. Contact API
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, contactNumber, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, email, and message are required.',
      });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address format.',
      });
    }

    const submission = await saveContactSubmission({
      firstName,
      lastName,
      email,
      contactNumber,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been saved.',
      data: submission,
    });
  } catch (err) {
    console.error('Error saving contact submission:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to save contact message. Please try again later.',
    });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const submissions = await getContactSubmissions();
    return res.json({ success: true, data: submissions });
  } catch (err) {
    console.error('Error fetching contact submissions:', err);
    return res.status(500).json({ success: false, error: 'Database query failed.' });
  }
});

// 2. Career API
app.post('/api/career', upload.single('resume'), async (req, res) => {
  try {
    const { firstName, lastName, gender, email, phone, jobPosition } = req.body;

    if (!firstName || !lastName || !phone || !jobPosition) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, phone, and job position are required.',
      });
    }

    const resumeFilename = req.file ? req.file.filename : null;
    const resumeOriginalName = req.file ? req.file.originalname : null;

    const application = await saveCareerApplication({
      firstName,
      lastName,
      gender,
      email,
      phone,
      jobPosition,
      resumeFilename,
      resumeOriginalName,
    });

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our HR team will review your application.',
      data: application,
    });
  } catch (err) {
    console.error('Error saving career application:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to submit application. Please try again later.',
    });
  }
});

app.get('/api/career', async (req, res) => {
  try {
    const applications = await getCareerApplications();
    return res.json({ success: true, data: applications });
  } catch (err) {
    console.error('Error fetching career applications:', err);
    return res.status(500).json({ success: false, error: 'Database query failed.' });
  }
});

// Download resume file
app.get('/api/career/resume/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    return res.status(404).json({ success: false, error: 'File not found.' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await getDbPool();
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: err.message });
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`[Express API Server] Running on http://localhost:${PORT}`);
  try {
    await getDbPool();
    console.log('[Express API Server] Database initialized and ready.');
  } catch (err) {
    console.warn('[Express API Server] Started, but Database connection failed (check your SQL Server settings in .env):', err.message);
  }
});
