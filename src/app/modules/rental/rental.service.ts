import mongoose from "mongoose"
import { User } from "../users/user.model"
import { TRental } from "./rental.interface"
import { Rental } from "./rental.model"

const createRentalIntoDB = async (email: string, payload: TRental) => {
	const user = await User.findOne({ email })
	const newId = new mongoose.Types.ObjectId(user?._id)
	payload.userId = newId

	const result = await Rental.create(payload)
	return result
}

const getAllRentalFromDB = async (email: string) => {
	const user = await User.findOne({ email })
	const result = await Rental.find({ userId: user?._id })
	return result
}

export const RentalServices = {
	createRentalIntoDB,
	getAllRentalFromDB,
}
