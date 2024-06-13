import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { UserValidation } from "./user.validation"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"
const router = express.Router()

// sign up user route
router.post(
	"/signup",
	validateRequest(UserValidation.createUserValidationSchema),
	UserController.createUser
)

// login user route
router.post(
	"/login",
	validateRequest(UserValidation.loginValidationSchema),
	UserController.loginUser
)

// get user data
router.get("/me", UserController.getUser)

// update user
router.put(
	"/me",
	validateRequest(UserValidation.updateUserValidationSchema),
	UserController.updateUser
)

export const UserRoutes = router
