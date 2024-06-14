import { ErrorRequestHandler } from "express"
import { ZodError } from "zod"
import AppError from "../error/appError"
import handleZodError from "../errors/handleZodError"
import { TErrorMessages } from "../interface/error"
import handleValidatorError from "../errors/handleValidatorError"
import handleCastError from "../errors/handleCastError"
import handleDuplicateError from "../errors/handleDuplicateError"

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let statuscode = 500
	let message = "something went wrong"

	let errorMessages: TErrorMessages = [
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
		stack: "error stack",
	})
}

export default globalErrorHandler