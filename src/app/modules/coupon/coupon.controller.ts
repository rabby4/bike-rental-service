import catchAsync from "../../utils/catchAsync"
import { CouponServices } from "./coupon.service"

const createCoupon = catchAsync(async (req, res) => {
	const result = await CouponServices.createCouponIntoDB(req.body)

	res.json({
		success: true,
		statusCode: 200,
		message: "Coupon created successfully",
		data: result,
	})
})

const getCouponsFromDB = catchAsync(async (req, res) => {
	const result = await CouponServices.getCouponsFromDB()

	res.json({
		success: true,
		statusCode: 200,
		message: "Retrieved the coupon successfully",
		data: result,
	})
})

export const CouponController = {
	createCoupon,
	getCouponsFromDB,
}
