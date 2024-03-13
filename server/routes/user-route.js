

import express from 'express'
import { findUsers} from '../controllers/user-controller.js'
const router  = express()

router.get('/find-users',findUsers)


export default router