import QueryBuilder from "../../builder/QueryBuilder"
import { TBike } from "./bike.interface"
import { Bike } from "./bike.model"

const createBikeIntoDB = async (payload: TBike) => {
	const result = await Bike.create(payload)
	return result
}

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
	const bikeQuery = new QueryBuilder(Bike.find(), query)
		.search(["name"])
		.filter()
		.sort()
		.paginate()
		.fields()

	const result = await bikeQuery.modelQuery
	return result
}

const getSingleBikesFromDB = async (id: string) => {
	const result = await Bike.findById(id)
	return result
}

const updateBikesIntoDB = async (id: string, payload: Partial<TBike>) => {
	const result = await Bike.findByIdAndUpdate(id, payload, {
		new: true,
		runValidators: true,
	})
	return result
}

const deleteBikesFromDB = async (id: string) => {
	const result = await Bike.findByIdAndDelete(id)
	return result
}

export const BikeServices = {
	createBikeIntoDB,
	getAllBikesFromDB,
	getSingleBikesFromDB,
	updateBikesIntoDB,
	deleteBikesFromDB,
}
