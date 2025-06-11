import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";

type TActiveLinkProps = {
	url: string;
	children: React.ReactNode;
};
type TMenuItemProps = {
	url: string;
	title: string;
	icon: React.ReactNode;
	onlyIcon?: boolean;
};
//User
type TCreateUserParams = {
	clerkId: string;
	username: string;
	email: string;
	name?: string;
	avatar?: string;
};
//Course
type TCreateCourseParams = {
	title: string;
	slug: string;
	author: string;
};
type TUpdateCourseParams = {
	slug: string;
	updateData: Partial<ICourse>;
	path?: string;
};
export type TUpdateCourseLecture = {
	_id: string;
	title: string;
	lessons: ILesson[];
};
export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> {
	lectures: ILecture[];
}
//Lecture
export type TCreateLectureParams = {
	course: string;
	title?: string;
	order?: number;
	path?: string;
};
export type TUpdateLectureParams = {
	lectureId: string;
	updateData: {
		title?: string;
		order?: number;
		_destroy?: boolean;
		path?: string;
	};
};
//lesson
export type TCreateLessonParams = {
	lecture: string;
	course: string;
	title?: string;
	order?: number;
	path?: string;
	slug?: string;
};
export type TUpdateLessonParams = {
	lessonId: string;
	updateData: {
		title?: string;
		slug?: string;
		duration?: number;
		video_url?: string;
		content?: string;
	};
	path?: string;
};
export {
	TActiveLinkProps,
	TMenuItemProps,
	TCreateUserParams,
	TCreateCourseParams,
	TUpdateCourseParams,
};
