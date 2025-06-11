import Heading from "@/components/common/Heading";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";

const page = async ({
	searchParams,
}: {
	searchParams: Promise<{
		slug: string;
	}>;
}) => {
	const { slug } = await searchParams;
	const findCourse = await getCourseBySlug({ slug });
	if (!findCourse) return <div>Không tìm thấy khóa học</div>;
	return (
		<>
			<Heading>
				Nội dung: <strong className="text-primary">{findCourse.title}</strong>
			</Heading>
			<CourseUpdateContent
				course={JSON.parse(JSON.stringify(findCourse))}
			></CourseUpdateContent>
		</>
	);
};

export default page;
