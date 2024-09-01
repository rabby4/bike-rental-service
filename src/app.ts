/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from "express"
import cors from "cors"
import router from "./app/router"
import globalErrorHandler from "./app/middleware/globalErrorHandler"
import notFound from "./app/middleware/notFound"
import sendResponse from "./app/utils/sendResponse"
import path from "path"

const app = express()

// parser
app.use(express.json())

const allowedOrigins = [
	"http://localhost:5173",
	"https://bike-rental-lovat.vercel.app",
	"https://bike-rental-service-rose.vercel.app",
]

const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (allowedOrigins.includes(origin) || !origin) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
}

app.use(cors(corsOptions))

// server main route
app.use("/api", router)

app.get("/", (req: Request, res: Response) => {
	sendResponse(res, {
		success: true,
		statusCode: 200,
		message: "Welcome to Bike Rental Service server API",
	})
})

app.use(express.static(path.join(__dirname, "../public")))

app.get("/confirmation", (req: Request, res: Response) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://bike-rental-service-rose.vercel.app"
	)
	res.sendFile(path.join(__dirname, "../public", "confirmation.html"))
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
