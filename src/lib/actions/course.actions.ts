"use server";
import {
	TCourseUpdateParams,
	TCreateCourseParams,
	TGetAllCourseParams,
	TUpdateCourseParams,
} from "@/types";
import { connectToDatabase } from "../mongoose";

import Course, { ICourse } from "@/database/course.model";
import { connect } from "http2";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { FilterQuery } from "mongoose";
import { ECourseStatus } from "@/types/enums";

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
export async function getAllCourses(
	params: TGetAllCourseParams
): Promise<ICourse[] | undefined> {
	try {
		connectToDatabase();
		const { page = 1, limit = 10, search, status } = params;
		const skip = (page - 1) * limit;
		const query: FilterQuery<typeof Course> = {};
		if (search) {
			query.$or = [{ title: { $regex: search, $options: "i" } }];
		}
		if (status) {
			query.status = status;
		}
		const courses = await Course.find(query)
			.skip(skip)
			.limit(limit)
			.sort({ created_at: -1 });
		return courses;
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
export async function getAllCoursesPublic(
	params: TGetAllCourseParams
): Promise<ICourse[] | undefined> {
	try {
		connectToDatabase();
		const { page = 1, limit = 10, search } = params;
		const skip = (page - 1) * limit;
		const query: FilterQuery<typeof Course> = {};
		if (search) {
			query.$or = [{ title: { $regex: search, $options: "i" } }];
		}
		query.status = ECourseStatus.APPROVED;
		const courses = await Course.find(query)
			.skip(skip)
			.limit(limit)
			.sort({ created_at: -1 });
		return courses;
	} catch (error) {
		console.log(error);
	}
}
