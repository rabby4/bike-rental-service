import { Schema, model } from "mongoose"
import { TReview } from "./review.interface"

const reviewSchema = new Schema<TReview>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		bikeId: {
			type: Schema.Types.ObjectId,
			ref: "Bike",
			required: [true, "Bike id is required"],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: true,
		},
		comment: {
			type: String,
			required: [true, "Comment is required"],
		},
	},
	{
		timestamps: true,
	}
)

export const Review = model<TReview>("Review", reviewSchema)
