import catchAsync from "../../utils/catchAsync"
import { ReviewServices } from "./review.service"

const createReview = catchAsync(async (req, res) => {
	const result = await ReviewServices.createReviewIntoDB(req.body)

	res.json({
		success: true,
		statusCode: 200,
		message: "Review created successfully",
		data: result,
	})
})

const getReviewsFromDB = catchAsync(async (req, res) => {
	const { bikeId } = req.params
	const result = await ReviewServices.getReviewsFromDB(bikeId)

	res.json({
		success: true,
		statusCode: 200,
		message: "Retrieved the Review successfully",
		data: result,
	})
})

export const ReviewController = {
	createReview,
	getReviewsFromDB,
}
