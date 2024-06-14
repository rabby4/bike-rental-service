import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { UserValidation } from "./user.validation"
import { UserController } from "./user.controller"
const router = express.Router()

// get user data
router.get("/me", UserController.getUser)

// update user
router.put(
	"/me",
	validateRequest(UserValidation.updateUserValidationSchema),
	UserController.updateUser
)

export const UserRoutes = router
