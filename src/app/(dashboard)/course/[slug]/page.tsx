/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { courseLevelTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { ILecture } from "@/database/lecture.model";
import LessonContent from "@/components/lesson/LessonContent";
import { buyCourse } from "@/lib/actions/user.actions";
import ButtonBuy from "./ButtonBuy";
import { ILesson } from "@/database/lesson.model";

const page = async ({
	params,
}: {
	params: Promise<{
		slug: string;
	}>;
}) => {
	const { slug } = await params;

	const data = await getCourseBySlug({
		slug,
	});

	// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types

	if (!data) return null;
	const videoId = data.intro_url?.split("v=")[1];
	const lectures = JSON.parse(JSON.stringify(data.lectures)) || [];
	return (
		<div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen">
			<div>
				<div className="relative aspect-video mb-5">
					{data.intro_url ? (
						<>
							<iframe
								width="853"
								height="480"
								src={`https://www.youtube.com/embed/${videoId}`}
								title={data.title}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								className="w-full h-full object-fill"
							></iframe>
						</>
					) : (
						<Image
							src={data.image}
							alt=""
							fill
							className="w-full h-full object-cover rounded-lg"
						/>
					)}
				</div>
				<h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
				<BoxSection title="Mô tả">
					<div className="leading-normal">{data.desc}</div>
				</BoxSection>
				<BoxSection title="Thông tin">
					<div className="grid grid-cols-4 gap-5 mb-10">
						<BoxInfo title="Bài học">100</BoxInfo>
						<BoxInfo title="Lượt xem">{data.views}</BoxInfo>
						<BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
						<BoxInfo title="Thời lượng">100</BoxInfo>
					</div>
				</BoxSection>
				<BoxSection title="Nội dung khóa học">
					<LessonContent lectures={lectures} course="" slug=""></LessonContent>
				</BoxSection>
				<BoxSection title="Yêu cầu">
					{data.info.requirements.map((r: string, index: number) => (
						<div key={index} className="mb-3 flex items-center gap-2">
							<span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.5 12.75l6 6 9-13.5"
									/>
								</svg>
							</span>
							<span>{r}</span>
						</div>
					))}
				</BoxSection>
				<BoxSection title="Lợi ích">
					{data.info.benefits.map((r, index) => (
						<div key={index} className="mb-3 flex items-center gap-2">
							<span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.5 12.75l6 6 9-13.5"
									/>
								</svg>
							</span>
							<span>{r}</span>
						</div>
					))}
				</BoxSection>
				<BoxSection title="Q&A">
					{data.info.qa.map(
						(
							qa: {
								question: string;
								answer: string;
							},
							index: number
						) => (
							<Accordion key={index} type="single" collapsible>
								<AccordionItem value={qa.question}>
									<AccordionTrigger>{qa.question}</AccordionTrigger>
									<AccordionContent>{qa.answer}</AccordionContent>
								</AccordionItem>
							</Accordion>
						)
					)}
				</BoxSection>
			</div>
			<div>
				<div className="bg-white rounded-lg p-5">
					<div className="flex items-center gap-2 mb-3">
						<strong className="text-primary text-xl font-bold">
							{data.price}
						</strong>
						<span className="text-slate-400 line-through text-sm">
							{data.sale_price}
						</span>
						<span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-white bg-opacity-10 font-semibold text-sm">
							{Math.floor((data.price / data.sale_price) * 100)}%
						</span>
					</div>
					<h3 className="font-bold mb-3 text-sm">Khóa học gồm có:</h3>
					<ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
						<li className="flex items-center gap-2">
							<IconPlay className="size-4" />
							<span>30h học</span>
						</li>
						<li className="flex items-center gap-2">
							<IconPlay className="size-4" />
							<span>Video Full HD</span>
						</li>
						<li className="flex items-center gap-2">
							<IconUsers className="size-4" />
							<span>Có nhóm hỗ trợ</span>
						</li>
						<li className="flex items-center gap-2">
							<IconStudy className="size-4" />
							<span>Tài liệu kèm theo</span>
						</li>
					</ul>
					<ButtonBuy slug={slug}></ButtonBuy>
				</div>
			</div>
		</div>
	);
};

function BoxInfo({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-white rounded-lg p-5">
			<h4 className="text-sm text-slate-400 font-normal">{title}</h4>
			<h3 className="font-bold">{children}</h3>
		</div>
	);
}

function BoxSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<>
			<h2 className="font-bold text-xl mb-5">{title}</h2>
			<div className="mb-10">{children}</div>
		</>
	);
}

export default page;
