import { Router } from "express"
import { UserRoutes } from "../modules/users/user.route"
import { BikeRoutes } from "../modules/bikes/bike.route"
import { RentalRoutes } from "../modules/rental/rental.router"

const router = Router()

const allRoutes = [
	{
		path: "/auth",
		route: UserRoutes,
	},
	{
		path: "/bikes",
		route: BikeRoutes,
	},
	{
		path: "/rentals",
		route: RentalRoutes,
	},
]

allRoutes.forEach((route) => router.use(route.path, route.route))

export default router
