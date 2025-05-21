import Heading from "@/components/common/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import React from "react";

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{
		slug: string;
	}>;
}) => {
	const { slug } = await searchParams;
	const findCourse = await getCourseBySlug({
		slug,
	});
	if (!findCourse) return null;
	return (
		<div>
			<Heading>Cập nhật khóa học</Heading>s
			<CourseUpdate
				data={JSON.parse(JSON.stringify(findCourse))}
			></CourseUpdate>
		</div>
	);
};

export default page;
