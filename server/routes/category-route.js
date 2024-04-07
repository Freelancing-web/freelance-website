

import express from 'express'

import { authenticate } from '../middleware/authMiddleware.js'

import { createCategory } from '../controllers/category-controller.js'

const router  = express()

router.post('/create-category',authenticate,createCategory)
// router.put('/update/:id',authenticate,upload.single('image'),updateProject)
// router.delete('/delete/:id',authenticate,deleteProject)



export default router