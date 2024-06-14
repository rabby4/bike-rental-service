import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"

// retrieved the users
const getUser = catchAsync(async (req, res) => {
	const result = await UserServices.getUserFromDB(req?.user?.id)
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "User profile retrieved successfully",
		data: result,
	})
})

// Update user information
const updateUser = catchAsync(async (req, res) => {
	const userData = req.body
	const result = await UserServices.updateUserIntoDB(req.user.id, userData)

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
