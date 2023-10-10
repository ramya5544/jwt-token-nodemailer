import express from 'express'
import { registerUser,loginUser,getUserById} from '../Controllers/user.controller.js'
import authMiddleware from '../Middleware/auth.middleware.js'
const router=express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/getuser',authMiddleware,getUserById)


// router.post('/update/:id',updateUser)
// router.delete('/delete/:id',deleteUser)
export default router;