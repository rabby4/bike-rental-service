import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { AuthController } from "./auth.controller"
import { AuthValidation } from "./auth.validation"
const router = express.Router()

// sign up user route
router.post(
	"/signup",
	validateRequest(AuthValidation.createUserValidationSchema),
	AuthController.createUser
)

// login user route
router.post(
	"/login",
	validateRequest(AuthValidation.loginValidationSchema),
	AuthController.loginUser
)

export const AuthRoutes = router
