import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { BikeValidation } from "./bike.validation"
import { BikeController } from "./bike.controller"
import auth from "../../middleware/auth"
const router = express.Router()

router.post(
	"/",
	// auth("admin"),
	validateRequest(BikeValidation.createBikeValidationSchema),
	BikeController.createBike
)
router.get("/", auth("admin"), BikeController.getAllBikes)
router.put(
	"/:id",
	auth("admin"),
	validateRequest(BikeValidation.updateBikeValidationSchema),
	BikeController.updateBike
)
router.delete("/:id", auth("admin"), BikeController.deleteBike)

export const BikeRoutes = router
