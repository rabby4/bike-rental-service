export type TUser = {
	firstName: string
	lastName: string
	email: string
	password: string
	phone: string
	address: string
	role: "admin" | "user"
	image: string
}
export type TLoginUser = {
	email: string
	password: string
}
