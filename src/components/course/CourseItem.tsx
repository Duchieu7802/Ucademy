import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconEye from "../icons/IconEye";
import IconStar from "../icons/IconStar";
import IconClock from "../icons/IconClock";

const CourseItem = () => {
	const courseInfo = [
		{
			title: "3000",
			icon: (className?: string) => <IconEye className={className}></IconEye>,
		},
		{
			title: "5.0",
			icon: (className?: string) => <IconStar className={className}></IconStar>,
		},
		{
			title: "30h25p",
			icon: (className?: string) => (
				<IconClock className={className}></IconClock>
			),
		},
	];
	return (
		<div className="course-item bg-white border border-gray-200 p-4 rounded-lg ">
			<Link href="#" className="block h-[200px] relative">
				<Image
					alt=""
					src="https://images.unsplash.com/photo-1741738668550-3efca0fca23a?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					width={300}
					height={200}
					sizes="@media (min-width:640px) 300px, 100vw"
					className="w-full h-full object-cover rounded-lg"
				></Image>
				<span className="inline-block absolute top-3 right-3 bg-green-500 text-white text-sm font-medium px-3	py-1 rounded-full">
					New
				</span>
			</Link>
			<div className="pt-4">
				<h3 className="font-bold  mb-3 text-lg">
					Khóa học NextJs Pro - Xây dựng E-Learning system hoàn chỉnh
				</h3>
				<div className="flex items-center text-xs mb-5 text-gray-500 ">
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-2">
							<IconEye></IconEye>
							<span>3000</span>
						</div>
						<div className="flex items-center gap-2">
							<IconStar></IconStar>
							<span>5.0</span>
						</div>
						<div className="flex items-center gap-2">
							<IconClock></IconClock>
							<span>30h25p</span>
						</div>
					</div>
					<p className="text-primary font-bold ml-auto text-base">799.000</p>
				</div>
			</div>
			<Link
				href="#"
				className="flex items-center justify-center w-full bg-primary h-12 rounded-lg text-white mt-10 font-semibold"
			>
				<p>Xem chi tiết</p>
			</Link>
		</div>
	);
};

export default CourseItem;
