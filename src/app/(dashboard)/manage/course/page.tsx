import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import React from "react";

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{
		page: number;
		search: string;
		status: ECourseStatus;
	}>;
}) => {
	const { page, search, status } = await searchParams;
	const courses = await getAllCourses({
		page: page || 1,
		limit: 10,
		search: search || "",
		status: status || ECourseStatus.APPROVED,
	});
	return (
		<div>
			<CourseManage
				course={courses ? JSON.parse(JSON.stringify(courses)) : []}
			></CourseManage>
		</div>
	);
};

export default page;
