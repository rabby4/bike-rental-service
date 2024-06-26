import { TUser } from "../auth/auth.interface"
import { User } from "../auth/auth.model"

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

export const UserServices = {
	getUserFromDB,
	updateUserIntoDB,
}
