import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import sendResponse from "../utils/sendResponse"

const notFound = (req: Request, res: Response, next: NextFunction) => {
	const message = "API Not Found !!"
	// return res.status(httpStatus.NOT_FOUND).json({
	// 	success: false,
	// 	statusCode: 404,
	// 	message: "Not Found!",
	// })
	return sendResponse(res, {
		success: false,
		statusCode: httpStatus.NOT_FOUND,
		message: "Not Found!",
	})
}

export default notFound
