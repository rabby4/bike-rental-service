import config from "../../config"
import { TLoginUser, TUser } from "./auth.interface"
import { User } from "./auth.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createUserIntoDB = async (payload: TUser) => {
	const result = await User.create(payload)
	return result
}

const loginUser = async (payload: TLoginUser) => {
	// check if the user exists
	const isUserExists = await User.findOne(
		{ email: payload.email },
		{ createdAt: 0, updatedAt: 0, __v: 0 }
	)

	if (!isUserExists) {
		throw new Error("User is not exist")
	}

	// checking if the password matched
	const isPasswordMatched = await bcrypt.compare(
		payload?.password,
		isUserExists.password
	)

	if (!isPasswordMatched) {
		throw new Error("Password do not matched!")
	}
	// create access token
	const userData = {
		email: isUserExists.email,
		role: isUserExists.role,
	}

	const accessToken = jwt.sign(userData, config.jwt_access_token as string, {
		expiresIn: "1d",
	})
	return {
		accessToken,
		isUserExists,
	}
}

export const AuthServices = {
	createUserIntoDB,
	loginUser,
}
