import { Response } from "express"

type TResponse<T> = {
	statusCode: number | string
	success?: boolean
	message?: string
	data?: T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
	res.json({
		success: data.success,
		statusCode: data.statusCode,
		message: data.message,
		data: data.data,
	})
}

export default sendResponse
