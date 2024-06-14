import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { BikeValidation } from "./bike.validation"
import { BikeController } from "./bike.controller"
import auth from "../../middleware/auth"
import { USER_ROLE } from "../users/user.constant"
const router = express.Router()

router.post(
	"/",
	auth(USER_ROLE.admin),
	validateRequest(BikeValidation.createBikeValidationSchema),
	BikeController.createBike
)
router.get("/", auth(USER_ROLE.user), BikeController.getAllBikes)
router.put(
	"/:id",
	auth(USER_ROLE.admin),
	validateRequest(BikeValidation.updateBikeValidationSchema),
	BikeController.updateBike
)
router.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike)

export const BikeRoutes = router
