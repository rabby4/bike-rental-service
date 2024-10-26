import express from "express"
// import validateRequest from "../../middleware/validationRequest"
// import { BikeValidation } from "./bike.validation"
import { BikeController } from "./bike.controller"
import auth from "../../middleware/auth"
import { USER_ROLE } from "../users/user.constant"
import { multerUpload } from "../../config/multer.config"
const router = express.Router()

router.post(
	"/",
	auth(USER_ROLE.admin),
	multerUpload.single("image"),
	// validateRequest(BikeValidation.createBikeValidationSchema),
	BikeController.createBike
)
router.get("/", BikeController.getAllBikes)
router.get("/:id", BikeController.getSingleBikes)
router.put(
	"/:id",
	auth(USER_ROLE.admin),
	multerUpload.single("image"),
	// validateRequest(BikeValidation.updateBikeValidationSchema),
	BikeController.updateBike
)
router.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike)

export const BikeRoutes = router
