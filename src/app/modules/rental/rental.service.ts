import mongoose from "mongoose"
import { TRental } from "./rental.interface"
import { Rental } from "./rental.model"
import { Bike } from "../bikes/bike.model"
import { User } from "../auth/auth.model"

const createRentalIntoDB = async (email: string, payload: TRental) => {
	const user = await User.findOne({ email })
	const newId = new mongoose.Types.ObjectId(user?._id)
	payload.userId = newId

	const isBikeAvailable = await Bike.findById(payload.bikeId)

	if (!isBikeAvailable?.isAvailable) {
		throw new Error("Bike is not available for rent!")
	}

	const updateBikeAvailability = await Bike.findByIdAndUpdate(
		payload.bikeId,
		{ isAvailable: false },
		{ new: true }
	)

	const result = await Rental.create(payload)
	return result
}

const returnRental = async (id: string) => {
	const rentalData = await Rental.findById(id)
	const rentalBike = await Bike.findOne({ _id: rentalData?.bikeId })

	const updateBikeAvailability = await Bike.findByIdAndUpdate(
		{ _id: rentalData?.bikeId },
		{ isAvailable: true },
		{ new: true }
	)
	if (!rentalData?.startTime) throw new Error("Invalid Date formate")

	const startTime = +new Date(rentalData?.startTime)
	const returnTime = +new Date()
	const rentTime = returnTime - startTime

	const totalHours = Math.floor(rentTime / (1000 * 60 * 60))

	if (!rentalBike?.pricePerHour) throw new Error("Price is not found!")
	const totalCost = totalHours * rentalBike?.pricePerHour

	const updateReturnTimeAndCost = await Rental.findByIdAndUpdate(
		id,
		{
			returnTime: new Date(),
			totalCost: totalCost,
			isReturned: true,
		},
		{ new: true, runValidators: true }
	)

	return updateReturnTimeAndCost
}

const getAllRentalFromDB = async (email: string) => {
	const user = await User.findOne({ email })
	const result = await Rental.find({ userId: user?._id })
	return result
}

export const RentalServices = {
	createRentalIntoDB,
	returnRental,
	getAllRentalFromDB,
}
