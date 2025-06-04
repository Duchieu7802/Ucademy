import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconEye from "../icons/IconEye";
import IconStar from "../icons/IconStar";
import IconClock from "../icons/IconClock";
import { ICourse } from "@/database/course.model";

const CourseItem = ({ data }: { data: ICourse }) => {
	return (
		<div className="course-item bg-white border border-gray-200 p-4 rounded-lg dark:bg-grayDarker dark:border-gray-200/10">
			<Link href={`/course/${data.slug}`} className="block h-[200px] relative">
				<Image
					alt=""
					src={data.image}
					width={300}
					height={200}
					sizes="@media (min-width:640px) 300px, 100vw"
					className="w-full h-full object-cover rounded-lg"
				></Image>
				{/* <span className="inline-block absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-3	py-1 rounded-full">
					New
				</span> */}
			</Link>
			<div className="pt-4">
				<h3 className="font-bold  mb-3 text-lg">{data.title}</h3>
				<div className="flex items-center text-xs mb-5 text-gray-500 dark:text-grayDark ">
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-2">
							<IconEye></IconEye>
							<span>{data.views}</span>
						</div>
						<div className="flex items-center gap-2">
							<IconStar></IconStar>
							<span>{data.rating[0]}</span>
						</div>
						<div className="flex items-center gap-2">
							<IconClock></IconClock>
							<span>30h25p</span>
						</div>
					</div>
					<p className="text-primary font-bold ml-auto text-base 2xl:text-xs">
						{data.price.toLocaleString()}đ
					</p>
				</div>
			</div>
			<Link
				href={`/course/${data.slug}`}
				className="flex items-center justify-center w-full bg-primary h-12 rounded-lg text-white mt-10 font-semibold"
			>
				<p>Xem chi tiết</p>
			</Link>
		</div>
	);
};

export default CourseItem;
