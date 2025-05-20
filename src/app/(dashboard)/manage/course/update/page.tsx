import Heading from "@/components/common/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import React from "react";

const page = ({
	searchParams,
}: {
	searchParams: {
		slug: string;
	};
}) => {
	return (
		<div>
			<Heading>Cập nhật khóa học</Heading>
			<CourseUpdate></CourseUpdate>
		</div>
	);
};

export default page;
