import catchAsync from "../../utils/catchAsync"
import { RentalServices } from "./rental.service"

const createRental = catchAsync(async (req, res) => {
	const result = await RentalServices.createRentalIntoDB(
		req.user.email,
		req.body
	)

	res.json({
		success: true,
		statusCode: 200,
		message: "Rental created successfully",
		data: result,
	})
})

const paymentConfirmation = catchAsync(async (req, res) => {
	res.send(`<h1>Payment confirm</h1>`)
})

const returnRental = catchAsync(async (req, res) => {
	const { id } = req.params
	const result = await RentalServices.returnRental(id)
	res.json({
		success: true,
		statusCode: 200,
		message: "Bike returned successfully",
		data: result,
	})
})

const getAllRental = catchAsync(async (req, res) => {
	const result = await RentalServices.getAllRentalFromDB(req.user.email)
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
		message: "Rentals retrieved successfully",
		data: result,
	})
})

const updateRentalFullPayment = catchAsync(async (req, res) => {
	const { id } = req.params
	const result = await RentalServices.updateRentalFullPayment(id)
	res.json({
		success: true,
		statusCode: 200,
		message: "Redirecting payment page!",
		data: result,
	})
})

export const RentalController = {
	createRental,
	paymentConfirmation,
	returnRental,
	getAllRental,
	updateRentalFullPayment,
}
