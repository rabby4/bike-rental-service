import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config"
import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"

const getUser = catchAsync(async (req, res) => {
	const token: any = req.headers.authorization

	const decoded = jwt.verify(
		token,
		config.jwt_access_token as string
	) as JwtPayload

	const email = await decoded.email

	const result = await UserServices.getUserFromDB(email)
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "User profile retrieved successfully",
		data: result,
	})
})

const updateUser = catchAsync(async (req, res) => {
	const token: any = req.headers.authorization

	const decoded = jwt.verify(
		token,
		config.jwt_access_token as string
	) as JwtPayload

	const email = await decoded.email
	const userData = req.body

	const result = await UserServices.updateUserIntoDB(email, userData)

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Profile updated successfully",
		data: result,
	})
})

export const UserController = {
	updateUser,
	getUser,
}
