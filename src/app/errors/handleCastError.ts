import mongoose from "mongoose"
import { TErrorMessage, TGenericErrorResponse } from "../interface/error"

const handleCastError = (
	err: mongoose.Error.CastError
): TGenericErrorResponse => {
	const errorMessage: TErrorMessage = [
		{
			path: err?.path,
			message: err?.message,
		},
	]

	const statusCode = 400
	return {
		statusCode,
		message: "Invalid ID",
		errorMessage,
	}
}

export default handleCastError
