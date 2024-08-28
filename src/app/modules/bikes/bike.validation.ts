import { z } from "zod"

const createBikeValidationSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
		description: z.string({ required_error: "Description is required" }),
		pricePerHour: z.number({ required_error: "Price is required" }),
		isAvailable: z.boolean().optional(),
		cc: z.number({ required_error: "Bike CC is required" }),
		year: z.number({ required_error: "Year is required" }),
		model: z.string({ required_error: "Model is required" }),
		brand: z.string({ required_error: "Brand is required" }),
		category: z.string({ required_error: "Category is required" }),
		color: z.string({ required_error: "Color is required" }),
		frame: z.number({ required_error: "Frame size is required" }),
		image: z.string({ required_error: "Image is required" }),
		support: z.number({ required_error: "Max. Support is required" }),
		weight: z.number({ required_error: "Weight is required" }),
	}),
})
const updateBikeValidationSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }).optional(),
		description: z
			.string({ required_error: "Description is required" })
			.optional(),
		pricePerHour: z.number({ required_error: "Price is required" }).optional(),
		isAvailable: z.boolean().optional(),
		cc: z.number({ required_error: "Bike CC is required" }).optional(),
		year: z.number({ required_error: "Year is required" }).optional(),
		model: z.string({ required_error: "Model is required" }).optional(),
		brand: z.string({ required_error: "Brand is required" }).optional(),
		category: z.string({ required_error: "Category is required" }).optional(),
		color: z.string({ required_error: "Color is required" }).optional(),
		frame: z.number({ required_error: "Frame size is required" }).optional(),
		image: z.string({ required_error: "Image is required" }).optional(),
		support: z
			.number({ required_error: "Max. Support is required" })
			.optional(),
		weight: z.number({ required_error: "Weight is required" }).optional(),
	}),
})

export const BikeValidation = {
	createBikeValidationSchema,
	updateBikeValidationSchema,
}
