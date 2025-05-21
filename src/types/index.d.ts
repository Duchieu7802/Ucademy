import { ICourse } from "@/database/course.model";

type TActiveLinkProps = {
	url: string;
	children: React.ReactNode;
};
type TMenuItemProps = {
	url: string;
	title: string;
	icon: React.ReactNode;
};
//User
type TCreateUserParams = {
	clerkId: string;
	username: string;
	email: string;
	name?: string;
	avatar?: string;
};
type TCreateCourseParams = {
	title: string;
	slug: string;
	author: string;
};
type TUpdateCourseParams = {
	slug: string;
	updateData: Partial<ICourse>;
};

export {
	TActiveLinkProps,
	TMenuItemProps,
	TCreateUserParams,
	TCreateCourseParams,
	TUpdateCourseParams,
};
