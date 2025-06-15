import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import { getUserCourses } from "@/lib/actions/user.actions";
import React from "react";
import StudyCourses from "./StudyCode";
import { getCourseBySlug } from "@/lib/actions/course.actions";

const page = async () => {
	const courses = await getUserCourses();

	return (
		<>
			<Heading>Khu vực học tập</Heading>
			<StudyCourses
				courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
			></StudyCourses>
		</>
	);
};

export default page;
