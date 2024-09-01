import { ZodError, ZodIssue } from "zod"
import { TErrorMessage, TGenericErrorResponse } from "../interface/error"

const handleZodError = (err: ZodError): TGenericErrorResponse => {
	const errorMessage: TErrorMessage = err.issues?.map((issue: ZodIssue) => {
		return {
			path: issue?.path[issue.path.length - 1],
			message: issue.message,
		}
	})

	const statusCode = 400
	return {
		statusCode,
		message: "Validation Error",
		errorMessage,
	}
}

export default handleZodError
