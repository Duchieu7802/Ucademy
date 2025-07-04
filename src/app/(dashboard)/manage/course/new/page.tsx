import Heading from "@/components/common/Heading";
import CourseAddNew from "@/components/course/CourseAddNew";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
	const { userId } = await auth();
	if (!userId) return null;
	const mongoUser = await getUserInfo({ userId });
	return (
		<div>
			<Heading>Tạo khóa học</Heading>
			<CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))}></CourseAddNew>
		</div>
	);
};

export default page;
