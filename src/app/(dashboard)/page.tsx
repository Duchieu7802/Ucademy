import CourseGrid from "@/components/common/CourseGrid";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import { GetAllCourse } from "@/lib/actions/course.actions";

import React from "react";

const page = async () => {
	const courses = (await GetAllCourse()) || [];
	return (
		<div>
			<Heading>Khám phá</Heading>
			<CourseGrid>
				{courses &&
					courses.map((item) => (
						<CourseItem data={item} key={item.slug}></CourseItem>
					))}
			</CourseGrid>
		</div>
	);
};

export default page;
