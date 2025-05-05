"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export default function createUser(params: IUser) {
	try {
		connectToDatabase();
		const newUser = User.create(params);
		return newUser;
	} catch (error) {
		console.log(error);
	}
}
