

import express from 'express'

import { authenticate } from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'
import { createProject, deleteProject, getUserProjects, updateProject } from '../controllers/project-controller.js'

const router  = express()

router.post('/create-project',authenticate,upload.single('image'),createProject)
router.put('/update/:id',authenticate,upload.single('image'),updateProject)
router.delete('/delete/:id',authenticate,deleteProject)
router.get('/user-projects',authenticate,getUserProjects)



export default router