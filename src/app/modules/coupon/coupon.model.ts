import { Schema, model } from "mongoose"
import { TCoupon } from "./coupon.interface"

const couponSchema = new Schema<TCoupon>({
	coupon: {
		type: String,
		required: true,
	},
	deal: {
		type: Number,
		required: true,
	},
	couponType: {
		type: String,
		enum: ["flat", "percentage"],
	},
})

export const Coupon = model<TCoupon>("Coupon", couponSchema)
