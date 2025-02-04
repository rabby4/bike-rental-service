import httpStatus from "http-status"
import config from "../../config"
import AppError from "../../errors/appError"
import { TLoginUser, TUser } from "./auth.interface"
import { User } from "./auth.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// create service function for create or register user
const createUserIntoDB = async (payload: TUser) => {
	const result = await User.create(payload)
	return result
}

// create service function for login user
const loginUser = async (payload: TLoginUser) => {
	// check if the user exists
	const isUserExists = await User.findOne(
		{ email: payload.email },
		{ createdAt: 0, updatedAt: 0, __v: 0 }
	)

	if (!isUserExists) {
		throw new AppError(httpStatus.NOT_FOUND, "User is not exist")
	}

	// checking if the password matched
	const isPasswordMatched = await bcrypt.compare(
		payload?.password,
		isUserExists.password
	)

	if (!isPasswordMatched) {
		throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!")
	}
	// create access token
	const userData = {
		id: isUserExists._id,
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
