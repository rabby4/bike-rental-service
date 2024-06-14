import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"

const createUser = catchAsync(async (req, res) => {
	const result = await AuthServices.createUserIntoDB(req.body)

	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "User registered successfully",
		data: result,
	})
})

const loginUser = catchAsync(async (req, res) => {
	const result = await AuthServices.loginUser(req.body)

	res.json({
		success: true,
		statusCode: 200,
		message: "User logged in successfully",
		token: result.accessToken,
		data: result.isUserExists,
	})
})

export const AuthController = {
	createUser,
	loginUser,
}
