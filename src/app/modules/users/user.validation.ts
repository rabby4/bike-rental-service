import { z } from "zod"

const updateUserValidationSchema = z.object({
	body: z.object({
		name: z.string().optional(),
		email: z.string().optional(),
		password: z.string().optional(),
		phone: z.string().optional(),
		address: z.string().optional(),
		role: z.string().optional(),
		image: z.string().optional(),
	}),
})

export const UserValidation = {
	updateUserValidationSchema,
}
