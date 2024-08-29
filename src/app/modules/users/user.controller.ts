import catchAsync from "../../utils/catchAsync"
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"

const getAllUserFromDB = catchAsync(async (req, res) => {
	const result = await UserServices.getAllUserFromDB()
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Retrieved All User successfully",
		data: result,
	})
})

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

// Update user information
const updateUserToAdmin = catchAsync(async (req, res) => {
	const result = await UserServices.updateUserToAdminIntoDB(req.params.id, {
		role: "admin",
	})

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Update User to Admin successfully",
		data: result,
	})
})
// Update user information
const deleteUser = catchAsync(async (req, res) => {
	const result = await UserServices.deleteUserFromDB(req.params.id)

	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "User deleted successfully",
		data: result,
	})
})

export const UserController = {
	getAllUserFromDB,
	updateUser,
	getUser,
	updateUserToAdmin,
	deleteUser,
}
