

import express from 'express'
import {createPost, deletePost, getUserPosts, updatePost} from '../controllers/post-controller.js'
import { authenticate } from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'

const router  = express()

router.post('/create-post',authenticate,upload.single('image'),createPost)
router.get('/user-posts',authenticate,getUserPosts)
router.delete('/delete/:id',authenticate,deletePost)
router.put('/update/:id',authenticate,upload.single('image'),updatePost)



export default router