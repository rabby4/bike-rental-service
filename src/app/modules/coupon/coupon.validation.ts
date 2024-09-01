import { z } from "zod"

const createCouponValidationSchema = z.object({
	body: z.object({
		coupon: z.string({ required_error: "Coupon code is required!" }),
		deal: z.number({ required_error: "Coupon amount is required!" }),
		couponType: z.string({ required_error: "Coupon type is required!" }),
	}),
})

export const CouponValidation = {
	createCouponValidationSchema: createCouponValidationSchema,
}
