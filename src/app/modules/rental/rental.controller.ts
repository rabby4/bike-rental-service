import jwt, { JwtPayload } from "jsonwebtoken"
import catchAsync from "../../utils/catchAsync"
import { RentalServices } from "./rental.service"
import config from "../../config"

const createRental = catchAsync(async (req, res) => {
	const token: any = req.headers.authorization

	const decoded = jwt.verify(
		token,
		config.jwt_access_token as string
	) as JwtPayload

	const email = await decoded.email

	const result = await RentalServices.createRentalIntoDB(email, req.body)
	res.json({
		success: true,
		statusCode: 200,
		message: "Rental created successfully",
		data: result,
	})
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
	const token: any = req.headers.authorization

	const decoded = jwt.verify(
		token,
		config.jwt_access_token as string
	) as JwtPayload

	const email = await decoded.email

	const result = await RentalServices.getAllRentalFromDB(email)
	res.json({
		success: true,
		statusCode: 200,
		message: "Rentals retrieved successfully",
		data: result,
	})
})

export const RentalController = {
	createRental,
	returnRental,
	getAllRental,
}
