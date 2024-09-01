import express from "express"
import auth from "../../middleware/auth"
import { USER_ROLE } from "../users/user.constant"
import validateRequest from "../../middleware/validationRequest"
import { CouponValidation } from "./coupon.validation"
import { CouponController } from "./coupon.controller"
const router = express.Router()

// Post rental
router.post(
	"/",
	auth(USER_ROLE.admin),
	validateRequest(CouponValidation.createCouponValidationSchema),
	CouponController.createCoupon
)
router.get("/", CouponController.getCouponsFromDB)

export const CouponRoutes = router
