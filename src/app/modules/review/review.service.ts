import { TReview } from "./review.interface"
import { Review } from "./review.modal"

const createReviewIntoDB = async (payload: TReview) => {
	const result = await Review.create(payload)
	return result
}
const getReviewsFromDB = async (bikeId: string) => {
	const result = await Review.find({ bikeId }).populate("userId")
	return result
}
export const ReviewServices = {
	createReviewIntoDB,
	getReviewsFromDB,
}
