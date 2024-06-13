import { Schema, model } from "mongoose"
import { TRental } from "./rental.interface"

const rentalSchema = new Schema<TRental>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	bikeId: {
		type: Schema.Types.ObjectId,
		ref: "Bike",
		required: [true, "Bike id is required"],
	},
	startTime: {
		type: Date,
		required: [true, "Start time is required"],
	},
	returnTime: {
		type: Date,
		default: null,
	},
	totalCost: {
		type: Number,
		default: 0,
	},
	isReturned: {
		type: Boolean,
		default: false,
	},
})

export const Rental = model<TRental>("Rental", rentalSchema)
