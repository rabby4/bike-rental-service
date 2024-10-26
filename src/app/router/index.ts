import { Router } from "express"
import { UserRoutes } from "../modules/users/user.route"
import { BikeRoutes } from "../modules/bikes/bike.route"
import { RentalRoutes } from "../modules/rental/rental.router"
import { AuthRoutes } from "../modules/auth/auth.route"
import { CouponRoutes } from "../modules/coupon/coupon.router"

const router = Router()

const allRoutes = [
	{
		path: "/auth",
		route: AuthRoutes,
	},
	{
		path: "/users",
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
	{
		path: "/coupons",
		route: CouponRoutes,
	},
]

allRoutes.forEach((route) => router.use(route.path, route.route))

export default router
