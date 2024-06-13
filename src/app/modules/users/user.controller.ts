import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"

const createUser = catchAsync(async (req, res) => {
	const result = await UserServices.createUserIntoDB(req.body)
	res.json({
		success: true,
		statusCode: 201,
		message: "User registered successfully",
		data: result,
	})
})

const loginUser = catchAsync(async (req, res) => {
	const result = await UserServices.loginUser(req.body)

	res.json({
		success: true,
		statusCode: 200,
		message: "User logged in successfully",
		// token: "jwt_token",
		data: result,
	})
})

export const UserController = {
	createUser,
	loginUser,
}
