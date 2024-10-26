import catchAsync from "../../utils/catchAsync"
import { BikeServices } from "./bike.service"

// create bike information
const createBike = catchAsync(async (req, res) => {
	const data = {
		...JSON.parse(req.body.data),
		image: req.file?.path,
	}
	const result = await BikeServices.createBikeIntoDB(data)
	res.json({
		success: true,
		statusCode: 200,
		message: "Bike Created successfully",
		data: result,
	})
})

const getAllBikes = catchAsync(async (req, res) => {
	const result = await BikeServices.getAllBikesFromDB(req.query)

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

const getSingleBikes = catchAsync(async (req, res) => {
	const { id } = req.params
	const result = await BikeServices.getSingleBikesFromDB(id)
	res.json({
		success: true,
		statusCode: 200,
		message: "Successfully retrieved single bike",
		data: result,
	})
})

const updateBike = catchAsync(async (req, res) => {
	const { id } = req.params
	const data = {
		...JSON.parse(req.body.data),
		image: req.file?.path,
	}
	const result = await BikeServices.updateBikesIntoDB(id, data)

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
	getSingleBikes,
	updateBike,
	deleteBike,
}
