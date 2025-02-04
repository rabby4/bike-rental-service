import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
	NODE_ENV: process.env.NODE_ENV,
	path: process.env.PORT,
	database_url: process.env.DATABASE_URL,
	bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
	jwt_access_token: process.env.JWT_ACCESS_TOKEN,
	store_id: process.env.STORE_ID,
	signature_key: process.env.SIGNATURE_KEY,
	payment_url: process.env.PAYMENT_URL,
	cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
	payment_verify_url: process.env.PAYMENT_VERIFY_URL,
	client_url: process.env.CLIENT_URL,
}
