import { TUser } from "../auth/auth.interface"
import { User } from "../auth/auth.model"

const getUserFromDB = async (email: string) => {
	const result = await User.findOne({ email })
	return result
}

const updateUserIntoDB = async (email: string, payload: TUser) => {
	const result = await User.findOneAndUpdate({ email }, payload, {
		new: true,
		runValidators: true,
	})
	return result
}

export const UserServices = {
	getUserFromDB,
	updateUserIntoDB,
}
