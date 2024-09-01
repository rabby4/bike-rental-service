/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import sendResponse from "../utils/sendResponse"

const notFound = (req: Request, res: Response, next: NextFunction) => {
	return sendResponse(res, {
		success: false,
		statusCode: httpStatus.NOT_FOUND,
		message: "Not Found!",
	})
}

export default notFound
