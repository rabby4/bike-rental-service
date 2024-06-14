import { TErrorMessages, TGenericErrorResponse } from "../interface/error"

const handleDuplicateError = (err: any): TGenericErrorResponse => {
	// Extract value within double quotes using regex
	const match = err.message.match(/"([^"]*)"/)

	// The extracted value will be in the first capturing group
	const extractedValue = match && match[1]
	const errorSources: TErrorMessages = [
		{
			path: "",
			message: `${extractedValue} is already exists`,
		},
	]

	const statusCode = 400
	return {
		statusCode,
		message: "Invalid ID",
		errorMessages: errorSources,
	}
}

export default handleDuplicateError
