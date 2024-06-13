import { AnyZodObject } from "zod"
import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"
import AppError from "../error/appError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const auth = (...requiredRoles: ["admin" | "user"]) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization

		// if the token is send from the client
		if (!token) {
			throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
		}

		// check if the token is valid or not
		const decoded = jwt.verify(
			token,
			config.jwt_access_token as string
		) as JwtPayload

		console.log(decoded)

		if (requiredRoles && !requiredRoles.includes(decoded.role)) {
			throw new Error()
		}
		req.user = decoded as JwtPayload
		next()
	})
}
export default auth
