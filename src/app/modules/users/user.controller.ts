import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
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

export const UserController = {
	createUser,
}
