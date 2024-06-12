import { TBike } from "./bike.interface"
import { Bike } from "./bike.model"

const createBikeIntoDB = async (payload: TBike) => {
	const result = await Bike.create(payload)
	return result
}

const getAllBikesFromDB = async () => {
	const result = await Bike.find()
	return result
}

export const BikeServices = {
	createBikeIntoDB,
	getAllBikesFromDB,
}
