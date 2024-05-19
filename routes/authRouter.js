import { Router } from "express";
const router = Router();
import { registerUser , loginUser, logoutUser} from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";



router.post('/register',validateRegisterInput,registerUser).post('/login',validateLoginInput,loginUser);
router.get('/logout',logoutUser)

export default router