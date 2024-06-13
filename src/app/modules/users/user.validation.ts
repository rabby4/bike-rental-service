import { z } from "zod"

const createUserValidationSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
		email: z.string({ required_error: "Email is required" }),
		password: z.string({ required_error: "Password is required" }),
		phone: z.string({ required_error: "Phone number is required" }),
		address: z.string({ required_error: "Address is required" }),
		role: z.string({ required_error: "Role is required" }),
	}),
})
const updateUserValidationSchema = z.object({
	body: z.object({
		name: z.string().optional(),
		email: z.string().optional(),
		password: z.string().optional(),
		phone: z.string().optional(),
		address: z.string().optional(),
		role: z.string().optional(),
	}),
})

const loginValidationSchema = z.object({
	body: z.object({
		email: z.string({ required_error: "ID is required" }),
		password: z.string({ required_error: "Password is required" }),
	}),
})

export const UserValidation = {
	createUserValidationSchema,
	updateUserValidationSchema,
	loginValidationSchema,
}
