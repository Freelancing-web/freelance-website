

import express from 'express'
import { signup, signIn} from '../controllers/auth-controller.js'
const router  = express()

router.post('/sign-up',signup)
router.post('/sign-in',signIn)

export default router