"use server";
import {
	TCourseUpdateParams,
	TCreateCourseParams,
	TUpdateCourseParams,
} from "@/types";
import { connectToDatabase } from "../mongoose";

import Course, { ICourse } from "@/database/course.model";
import { connect } from "http2";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";

export async function CreateCourse(params: TCreateCourseParams) {
	try {
		connectToDatabase();
		const existCourse = await Course.findOne({ slug: params.slug });
		if (existCourse) {
			return {
				success: false,
				message: "Đường dẫn khóa học đã tồn tại!",
			};
		}
		const course = await Course.create(params);
		return {
			success: true,
			data: JSON.parse(JSON.stringify(course)),
		};
	} catch (error) {
		console.log(error);
	}
}
export async function GetAllCourse(): Promise<ICourse[] | undefined> {
	try {
		connectToDatabase();
		const allCourse = await Course.find();
		return allCourse;
	} catch (error) {
		console.log(error);
	}
}
export async function getCourseBySlug({
	slug,
}: {
	slug: string;
}): Promise<TCourseUpdateParams | undefined> {
	try {
		connectToDatabase();
		const findCourse = await Course.findOne({ slug }).populate({
			path: "lectures",
			model: Lecture,
			select: "_id title",
			match: {
				_destroy: false,
			},
			populate: {
				path: "lessons",
				model: Lesson,
				match: {
					_destroy: false,
				},
			},
		});
		return findCourse;
	} catch (error) {
		console.log(error);
	}
}
export async function updateCourse(params: TUpdateCourseParams) {
	try {
		connectToDatabase();
		const course = await Course.findOne({ slug: params.slug });
		if (!course) return;
		await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
			new: true,
		});
		revalidatePath(params.path || "/");
		return {
			success: true,
			message: "Cập nhật khóa học thành công!",
		};
	} catch (error) {
		console.log(error);
	}
}
