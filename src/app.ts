import express, { Request, Response } from "express"
import cors from "cors"
import router from "./app/router"
import globalErrorHandler from "./app/middleware/globalErrorHandler"
import notFound from "./app/middleware/notFound"
import sendResponse from "./app/utils/sendResponse"
const app = express()

// parser
app.use(express.json())
app.use(cors())

// server main route
app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Welcome to Bike Rental Service server API",
	})
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
