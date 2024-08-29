import { TUser } from "../auth/auth.interface"
import { User } from "../auth/auth.model"

const getAllUserFromDB = async () => {
	const result = await User.find()
	return result
}

const getUserFromDB = async (id: string) => {
	const result = await User.findOne({ _id: id })
	return result
}

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
	const result = await User.findByIdAndUpdate({ _id: id }, payload, {
		new: true,
		runValidators: true,
	})
	return result
}

const updateUserToAdminIntoDB = async (id: string, payload: Partial<TUser>) => {
	const result = await User.findByIdAndUpdate({ _id: id }, payload)
	return result
}
const deleteUserFromDB = async (id: string) => {
	const result = await User.findByIdAndDelete({ _id: id })
	return result
}

export const UserServices = {
	getAllUserFromDB,
	getUserFromDB,
	updateUserIntoDB,
	updateUserToAdminIntoDB,
	deleteUserFromDB,
}
