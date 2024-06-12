import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { BikeValidation } from "./bike.validation"
import { BikeController } from "./bike.controller"
const router = express.Router()

router.post(
	"/",
	validateRequest(BikeValidation.bikeValidationSchema),
	BikeController.createBike
)
router.get("/", BikeController.getAllBikes)

export const BikeRoutes = router
