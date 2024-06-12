import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { UserValidation } from "./user.validation"
import { UserController } from "./user.controller"
const router = express.Router()

router.post(
	"/signup",
	validateRequest(UserValidation.userValidationSchema),
	UserController.createUser
)

export const UserRoutes = router
