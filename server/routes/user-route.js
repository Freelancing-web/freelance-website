

import express from 'express'
import { findUsers, updateProfile} from '../controllers/user-controller.js'
import { authenticate } from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'
const router  = express()

router.get('/find-users',findUsers)
router.put('/update-profile',authenticate, upload.single('profileImg'),updateProfile)


export default router