import config from "../../config"
import { TLoginUser, TUser } from "./user.interface"
import { User } from "./user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createUserIntoDB = async (payload: TUser) => {
	const result = await User.create(payload)
	return result
}

const loginUser = async (payload: TLoginUser) => {
	console.log(payload)
	// check if the user exists
	const isUserExists = await User.findOne({ email: payload.email })
	console.log(isUserExists)

	if (!isUserExists) {
		throw new Error("User is not exist")
	}

	// checking if the password matched
	const isPasswordMatched = await bcrypt.compare(
		payload?.password,
		isUserExists.password
	)
	console.log(isPasswordMatched)
	if (!isPasswordMatched) {
		throw new Error("Password do not matched!")
	}
	// create access token
	const userData = {
		email: isUserExists.email,
		role: isUserExists.role,
	}
	console.log(userData)

	const accessToken = jwt.sign(userData, config.jwt_access_token as string, {
		expiresIn: "1d",
	})
	return {
		accessToken,
	}
}

export const UserServices = {
	createUserIntoDB,
	loginUser,
}
