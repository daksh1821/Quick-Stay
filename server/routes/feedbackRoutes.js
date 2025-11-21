import express from 'express';
import { submitFeedback, getApprovedFeedback, getAllFeedback, approveFeedback, deleteFeedback } from '../controllers/feedbackController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/approved', getApprovedFeedback);

// Protected routes (user must be logged in)
router.post('/submit', authMiddleware, submitFeedback);

// Admin routes
router.get('/all', authMiddleware, adminMiddleware, getAllFeedback);
router.put('/approve/:feedbackId', authMiddleware, adminMiddleware, approveFeedback);
router.delete('/:feedbackId', authMiddleware, adminMiddleware, deleteFeedback);

export default router;
