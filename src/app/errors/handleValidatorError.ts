import mongoose from "mongoose"
import { TErrorMessage, TGenericErrorResponse } from "../interface/error"

const handleValidatorError = (
	err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
	const errorMessage: TErrorMessage = Object.values(err.errors)?.map(
		(val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
			return {
				path: val?.path,
				message: val?.message,
			}
		}
	)

	const statusCode = 400
	return {
		statusCode,
		message: "Validation Error",
		errorMessage,
	}
}

export default handleValidatorError
