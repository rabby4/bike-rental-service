import mongoose from "mongoose"
import { TRental } from "./rental.interface"
import { Rental } from "./rental.model"
import { Bike } from "../bikes/bike.model"
import { User } from "../auth/auth.model"
import axios from "axios"
import config from "../../config"
import AppError from "../../errors/appError"
import httpStatus from "http-status"

const createRentalIntoDB = async (email: string, payload: TRental) => {
	const user = await User.findOne({ email })
	const newId = new mongoose.Types.ObjectId(user?._id)
	payload.userId = newId

	const isBikeAvailable = await Bike.findById(payload.bikeId)

	if (!isBikeAvailable?.isAvailable) {
		throw new AppError(httpStatus.CONFLICT, "Bike is not available for rent!")
	}

	await Bike.findByIdAndUpdate(
		payload.bikeId,
		{ isAvailable: false },
		{ new: true }
	)

	// payment information
	const trxId = `TrxID-${Date.now()}`

	const initiatePayment = async () => {
		const response = await axios.post(config.payment_url!, {
			store_id: config.store_id,
			signature_key: config.signature_key,
			tran_id: trxId,
			success_url: "https://bike-rental-service-rose.vercel.app/confirmation",
			fail_url: "http://www.merchantdomain.com/failedpage.html",
			cancel_url: "http://www.merchantdomain.com/cancelpage.html",
			amount: "100",
			currency: "BDT",
			desc: "Merchant Registration Payment",
			cus_name: `${user?.firstName} ${user?.lastName}`,
			cus_email: user?.email,
			cus_add1: user?.address,
			cus_add2: "N/A",
			cus_city: "N/A",
			cus_state: "N/A",
			cus_postcode: "N/A",
			cus_country: "N/A",
			cus_phone: user?.phone,
			type: "json",
		})
		const responseData = await response.data
		return responseData
	}
	const paymentSession = await initiatePayment()

	const result = await Rental.create(payload)
	return { data: result, paymentSession }
}

const returnRental = async (id: string) => {
	const rentalData = await Rental.findById(id)
	const rentalBike = await Bike.findOne({ _id: rentalData?.bikeId })

	await Bike.findByIdAndUpdate(
		{ _id: rentalData?.bikeId },
		{ isAvailable: true },
		{ new: true }
	)
	if (!rentalData?.startTime)
		throw new AppError(httpStatus.NOT_FOUND, "Invalid Date formate")

	const givenTime = +new Date(rentalData?.startTime)
	const currentTime = +new Date()

	const rentTime = currentTime - givenTime

	const totalHours = (rentTime / (1000 * 60 * 60)).toFixed(2)

	if (!rentalBike?.pricePerHour)
		throw new AppError(httpStatus.NOT_FOUND, "Price is not found!")
	const totalCost = (Number(totalHours) * rentalBike?.pricePerHour).toFixed(2)

	const updateReturnTimeAndCost = await Rental.findByIdAndUpdate(
		id,
		{
			returnTime: new Date(),
			totalCost: totalCost,
			isReturned: true,
		},
		{ new: true, runValidators: true }
	)

	return updateReturnTimeAndCost
}

const getAllRentalFromDB = async (email: string) => {
	let result
	const user = await User.findOne({ email })
	if (user?.role === "user") {
		result = await Rental.find({ userId: user?._id }).populate("bikeId")
	} else {
		result = await Rental.find().populate("bikeId")
	}

	return result
}

const updateRentalFullPayment = async (id: string) => {
	const rentalData = await Rental.findById(id)
	const user = await User.findById(rentalData?.userId)

	if (!rentalData?.isReturned) {
		throw new AppError(httpStatus.NOT_FOUND, "This bike is not returned yet!")
	}

	const updateRentalPaymentStatus = await Rental.findByIdAndUpdate(
		id,
		{ fullPay: true },
		{ new: true }
	)

	// payment information
	const trxId = `TrxID-${Date.now()}`
	const paymentAmount =
		(rentalData?.totalCost as number) - (rentalData?.advancePay as number)

	const initiatePayment = async () => {
		const response = await axios.post(config.payment_url!, {
			store_id: config.store_id,
			signature_key: config.signature_key,
			tran_id: trxId,
			success_url: "https://bike-rental-service-rose.vercel.app/confirmation",
			fail_url: "http://www.merchantdomain.com/failedpage.html",
			cancel_url: "http://www.merchantdomain.com/cancelpage.html",
			amount: paymentAmount,
			currency: "BDT",
			desc: "Merchant Registration Payment",
			cus_name: `${user?.firstName} ${user?.lastName}`,
			cus_email: user?.email,
			cus_add1: user?.address,
			cus_add2: "N/A",
			cus_city: "N/A",
			cus_state: "N/A",
			cus_postcode: "N/A",
			cus_country: "N/A",
			cus_phone: user?.phone,
			type: "json",
		})
		const responseData = await response.data
		return responseData
	}
	const paymentSession = await initiatePayment()

	return { data: updateRentalPaymentStatus, paymentSession }
}

export const RentalServices = {
	createRentalIntoDB,
	returnRental,
	getAllRentalFromDB,
	updateRentalFullPayment,
}
