

import express from 'express'
import {  registerUser, login, signout} from '../controllers/auth-controller.js'
const router  = express()

router.post('/sign-up',registerUser)
router.post('/login',login)
router.post('/logout',signout)

export default router