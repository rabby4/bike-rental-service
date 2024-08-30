import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { RentalValidation } from "./rental.validation"
import { RentalController } from "./rental.controller"
import auth from "../../middleware/auth"
import { USER_ROLE } from "../users/user.constant"
const router = express.Router()

// Post rental
router.post(
	"/",
	auth(USER_ROLE.admin, USER_ROLE.user),
	validateRequest(RentalValidation.createRentalValidationSchema),
	RentalController.createRental
)
// payment confirmation
router.post("/confirmation", RentalController.paymentConfirmation)

// Get rental
router.get(
	"/",
	auth(USER_ROLE.user, USER_ROLE.admin),
	RentalController.getAllRental
)

// return rental (update)
router.put("/:id/return", auth(USER_ROLE.admin), RentalController.returnRental)

// full payment of rental (update)
router.patch(
	"/:id/full-payment",
	auth(USER_ROLE.user),
	RentalController.updateRentalFullPayment
)

export const RentalRoutes = router
