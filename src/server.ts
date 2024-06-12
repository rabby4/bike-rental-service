import mongoose from "mongoose"
import { Server } from "http"
import config from "./app/config"
import app from "./app"

let server: Server

async function main() {
	try {
		await mongoose.connect(config.database_url as string)
		server = app.listen(config.path, () => {
			console.log(`Express app listening on port ${config.path}`)
		})
	} catch (error) {
		console.log(error)
	}
}

main()
