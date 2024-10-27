import express from "express"
import validateRequest from "../../middleware/validationRequest"
import { ReviewValidation } from "./review.validation"
import { ReviewController } from "./review.controller"
const router = express.Router()

// Post rental
router.post(
	"/",
	validateRequest(ReviewValidation.createReviewValidationSchema),
	ReviewController.createReview
)
router.get("/:bikeId", ReviewController.getReviewsFromDB)

export const ReviewRoutes = router
