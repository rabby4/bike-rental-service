import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { RentalValidation } from "./rental.validation"
import { RentalController } from "./rental.controller"
const router = express.Router()

// Post rental
router.post(
	"/",
	validateRequest(RentalValidation.createRentalValidationSchema),
	RentalController.createRental
)

// Get rental
router.get("/", RentalController.getAllRental)

export const RentalRoutes = router
