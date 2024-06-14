import express from "express"
import cors from "cors"
import router from "./app/router"
import globalErrorHandler from "./app/middleware/globalErrorHandler"
import notFound from "./app/middleware/notFound"
const app = express()

// parser
app.use(express.json())
app.use(cors())

// server main route
app.use("/api", router)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
