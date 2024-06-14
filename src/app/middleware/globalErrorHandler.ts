import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
import AppError from "../errors/appError"
import handleZodError from "../errors/handleZodError"
import { TErrorMessage } from "../interface/error"
import handleValidatorError from "../errors/handleValidatorError"
import handleCastError from "../errors/handleCastError"
import handleDuplicateError from "../errors/handleDuplicateError"
import config from "../config"

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let statuscode = 500
	let message = "something went wrong"

	let errorMessages: TErrorMessage = [
		{
			path: "",
			message: "something went wrong",
		},
	]

	if (err instanceof ZodError) {
		const simplifiedError = handleZodError(err)
		statuscode = simplifiedError?.statusCode
		message = err?.message
		errorMessages = [
			{
				path: "",
				message: err?.message,
			},
		]
	} else if (err?.name === "ValidationError") {
		const simplifiedError = handleValidatorError(err)
		statuscode = simplifiedError?.statusCode
		message = err?.message
		errorMessages = [
			{
				path: "",
				message: err?.message,
			},
		]
	} else if (err?.name === "CastError") {
		const simplifiedError = handleCastError(err)
		statuscode = simplifiedError?.statusCode
		message = err?.message
		errorMessages = [
			{
				path: "",
				message: err?.message,
			},
		]
	} else if (err?.code === 11000) {
		const simplifiedError = handleDuplicateError(err)
		statuscode = simplifiedError?.statusCode
		message = err?.message
		errorMessages = [
			{
				path: "",
				message: err?.message,
			},
		]
	} else if (err instanceof AppError) {
		statuscode = err?.statusCode
		message = err?.message
		errorMessages = [
			{
				path: "",
				message: err?.message,
			},
		]
	} else if (err instanceof Error) {
		message = err?.message
		errorMessages = [
			{
				path: "",
				message: err?.message,
			},
		]
	}

	return res.status(statuscode).json({
		success: false,
		message,
		errorMessages,
		stack: config.NODE_ENV === "development" ? err?.stack : err.stack,
	})
}

export default globalErrorHandler
