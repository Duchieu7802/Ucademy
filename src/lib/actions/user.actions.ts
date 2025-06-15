"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";
import Course, { ICourse } from "@/database/course.model";
import { auth } from "@clerk/nextjs/server";
import { ECourseStatus } from "@/types/enums";
import { getCourseBySlug } from "./course.actions";

export async function createUser(params: TCreateUserParams) {
	try {
		await connectToDatabase();
		const newUser = await User.create(params);
		return newUser;
	} catch (error) {
		console.log(error);
	}
}
export async function getUserInfo({
	userId,
}: {
	userId: string | null;
}): Promise<IUser | null | undefined> {
	try {
		connectToDatabase();
		const findUser = await User.findOne({ clerkId: userId });
		if (!findUser) return null;
		return findUser;
	} catch (error) {
		console.log(error);
	}
}
export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
	try {
		connectToDatabase();
		const { userId } = await auth();
		const findUser = await User.findOne({ clerkId: userId }).populate({
			path: "courses",
			model: Course,
			match: {
				status: ECourseStatus.APPROVED,
			},
		});
		if (!findUser) return null;
		return findUser.courses;
	} catch (error) {
		console.log(error);
	}
}
export async function buyCourse({ slug }: { slug: string | null }) {
	try {
		connectToDatabase();
		const { userId } = await auth();
		const findUser = await User.findOne({ clerkId: userId });
		const findCourse = await Course.findOne({ slug });
		if (!findUser) return null;

		const alreadyPurchased = findUser.courses.some(
			(courseId: ICourse) =>
				courseId._id.toString() === findCourse._id.toString()
		);
		if (alreadyPurchased) {
			return { message: "Bạn đã mua khóa học này rồi!" };
		}
		findUser.courses.push(findCourse._id);
		await findUser.save();
		return {
			message: "Mua khóa học thành công!",
			success: true,
		};
	} catch (error) {
		console.log(error);
	}
}
