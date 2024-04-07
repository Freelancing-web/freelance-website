import express from "express";
import upload from '../middleware/upload.js';
import { authenticate } from "../middleware/authMiddleware.js";
import { createProfileInfo, getUserProfileInfo } from "../controllers/profile-controller.js";
; // Import your post controller

const router = express.Router();

router.post('/create-profile-info', authenticate, upload.single('resume'),createProfileInfo);
router.get('/user-info', authenticate,getUserProfileInfo);

export default router;