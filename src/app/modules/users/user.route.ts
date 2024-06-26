import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { UserValidation } from "./user.validation"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"
import { USER_ROLE } from "./user.constant"
const router = express.Router()

// get user data
router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), UserController.getUser)

// update user
router.put(
	"/me",
	auth(USER_ROLE.admin, USER_ROLE.user),
	validateRequest(UserValidation.updateUserValidationSchema),
	UserController.updateUser
)

export const UserRoutes = router
