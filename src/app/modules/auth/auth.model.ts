import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import config from "../../config"
import { TUser } from "./auth.interface"

const userSchema = new Schema<TUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "user"],
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				delete ret.password
			},
		},
	}
)

userSchema.pre("save", async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this
	// hashing password and save into database
	user.password = await bcrypt.hash(
		user.password as string,
		Number(config.bcrypt_salt_round)
	)
	next()
})

export const User = model<TUser>("User", userSchema)
