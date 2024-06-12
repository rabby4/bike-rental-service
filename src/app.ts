import express from "express"
import cors from "cors"
import router from "./app/router"
const app = express()

// parser
app.use(express.json())
app.use(cors())

// server main route
app.use("/api", router)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

export default app
