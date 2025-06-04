import CourseManage from "@/components/course/CourseManage";
import { GetAllCourse } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
	const courses = (await GetAllCourse()) || [];
	return (
		<div>
			<CourseManage
				course={courses ? JSON.parse(JSON.stringify(courses)) : []}
			></CourseManage>
		</div>
	);
};

export default page;
