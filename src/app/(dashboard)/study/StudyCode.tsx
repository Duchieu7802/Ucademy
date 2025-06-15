/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { lastLessonKey } from "@/constants";
import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";

const StudyCourses = ({
	courses,
}: {
	courses: ICourse[] | null | undefined;
}) => {
	if (!courses || courses.length <= 0) return null;

	const lastLesson =
		JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || [];
	return (
		<CourseGrid>
			{courses &&
				courses.length > 0 &&
				courses?.map((item) => {
					const url =
						//	eslint-disable-next-line @typescript-eslint/no-explicit-any
						lastLesson.find((el: any) => el.course === item.slug)?.lesson ||
						// @ts-expect-error
						`${item.slug}/lesson?slug=${item?.lectures[0]?.lessons[0]?.slug}`;
					return (
						<CourseItem
							key={item.slug}
							data={item}
							cta="Tiếp tục học"
							url={url}
						></CourseItem>
					);
					// console.log("🚀 ~ findCourse:", findCourse);
				})}
		</CourseGrid>
	);
};

export default StudyCourses;
