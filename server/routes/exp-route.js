

import express from 'express'

import { authenticate } from '../middleware/authMiddleware.js'
import { createExp, getUserExp } from '../controllers/exp-controller.js'


const router  = express()

router.post('/createExp',authenticate,createExp)
router.get('/user-exp',authenticate,getUserExp)




export default router