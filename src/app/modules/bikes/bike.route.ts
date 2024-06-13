import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { BikeValidation } from "./bike.validation"
import { BikeController } from "./bike.controller"
import auth from "../../middleware/auth"
const router = express.Router()

router.post(
	"/",
	validateRequest(BikeValidation.createBikeValidationSchema),
	BikeController.createBike
)
router.get("/", auth(), BikeController.getAllBikes)
router.put(
	"/:id",
	validateRequest(BikeValidation.updateBikeValidationSchema),
	BikeController.updateBike
)
router.delete("/:id", BikeController.deleteBike)

export const BikeRoutes = router
