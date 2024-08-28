import catchAsync from "../../utils/catchAsync"
import { BikeServices } from "./bike.service"

// create bike information
const createBike = catchAsync(async (req, res) => {
	const result = await BikeServices.createBikeIntoDB(req.body)
	res.json({
		success: true,
		statusCode: 200,
		message: "Bike Created successfully",
		data: result,
	})
})

const getAllBikes = catchAsync(async (req, res) => {
	const result = await BikeServices.getAllBikesFromDB()

	if (!result.length) {
		res.json({
			success: false,
			message: "No Data Found",
			data: result,
		})
	}
	res.json({
		success: true,
		statusCode: 200,
		message: "Bikes retrieved successfully",
		data: result,
	})
})

const updateBike = catchAsync(async (req, res) => {
	const { id } = req.params
	const result = await BikeServices.updateBikesIntoDB(id, req.body)

	if (!result) {
		res.json({
			success: false,
			message: "No Data Found",
			data: result,
		})
	}
	res.json({
		success: true,
		statusCode: 200,
		message: "Bike updated successfully",
		data: result,
	})
})

const deleteBike = catchAsync(async (req, res) => {
	const { id } = req.params
	const result = await BikeServices.deleteBikesFromDB(id)
	res.json({
		success: true,
		statusCode: 200,
		message: "Bike deleted successfully",
		data: result,
	})
})

export const BikeController = {
	createBike,
	getAllBikes,
	updateBike,
	deleteBike,
}
