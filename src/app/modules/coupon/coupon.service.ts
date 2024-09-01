import { TCoupon } from "./coupon.interface"
import { Coupon } from "./coupon.model"

const createCouponIntoDB = async (payload: TCoupon) => {
	const result = await Coupon.create(payload)
	return result
}
const getCouponsFromDB = async () => {
	const result = await Coupon.find()
	return result
}
export const CouponServices = {
	createCouponIntoDB,
	getCouponsFromDB,
}
