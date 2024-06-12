import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { BikeServices } from "./bike.service"

const createBike = catchAsync(async (req, res) => {
	const result = await BikeServices.createBikeIntoDB(req.body)
	res.json({
		success: true,
		statusCode: 200,
		message: "Bike added successfully",
		data: result,
	})
})

const getAllBikes = catchAsync(async (req, res) => {
	const result = await BikeServices.getAllBikesFromDB()
	res.json({
		success: true,
		statusCode: 200,
		message: "Bikes retrieved successfully",
		data: result,
	})
})

export const BikeController = {
	createBike,
	getAllBikes,
}
