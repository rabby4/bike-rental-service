import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"
import AppError from "../errors/appError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import sendResponse from "../utils/sendResponse"
import { TUserRole } from "../modules/users/user.constant"

const auth = (...requiredRoles: TUserRole[]) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		let token: string
		const getToken = req.headers.authorization

		// split the token
		if (getToken?.split(" ")[0] === "Bearer") {
			token = getToken?.split(" ")[1] as string
		} else {
			token = getToken as string
		}

		// if the token is send from the client
		if (!token) {
			sendResponse(res, {
				success: false,
				statusCode: 401,
				message: "You have no access to this route",
			})
			return
		}

		// check if the token is valid or not
		const decoded = jwt.verify(
			token,
			config.jwt_access_token as string
		) as JwtPayload

		if (requiredRoles && !requiredRoles.includes(decoded.role)) {
			sendResponse(res, {
				success: false,
				statusCode: 401,
				message: "You have no access to this route",
			})
			return
		}
		req.user = decoded as JwtPayload
		next()
	})
}
export default auth
