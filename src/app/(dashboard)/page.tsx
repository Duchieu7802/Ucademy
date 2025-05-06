import CourseGrid from "@/components/common/CourseGrid";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
	// const user = createUser({
	// 	clerkId: "clerk_123",
	// 	email_address: "duchieu@gmail.com",
	// 	username: "hieu",
	// });
	return (
		<div>
			<Heading>Khám phá</Heading>
			<CourseGrid>
				<CourseItem></CourseItem>
				<CourseItem></CourseItem>
				<CourseItem></CourseItem>
			</CourseGrid>
		</div>
	);
};

export default page;
