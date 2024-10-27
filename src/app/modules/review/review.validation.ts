import { z } from "zod"

const createReviewValidationSchema = z.object({
	body: z.object({
		bikeId: z.string(),
		userId: z.string(),
		rating: z.number(),
		comment: z.string(),
	}),
})

export const ReviewValidation = {
	createReviewValidationSchema,
}
