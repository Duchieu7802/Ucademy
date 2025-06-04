"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Heading from "../typography/Heading";
import Image from "next/image";
import { commonClassNames, courseStatus } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconStudy } from "../icons";
import IconEye from "../icons/IconEye";
import IconEdit from "../icons/IconEdit";
import IconDelete from "../icons/IconDelete";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
const IconArrowLeft = (
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
			d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
		/>
	</svg>
);
const IconArrowRight = (
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
			d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
		/>
	</svg>
);
const CourseManage = ({ course }: { course: ICourse[] }) => {
	const handleDeleteCourse = (slug: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await updateCourse({
					slug,
					updateData: {
						status: ECourseStatus.PENDING,
						_destroy: true,
					},
					path: "/manage/course",
				});
				toast.success("Xóa khóa học thành công!");
			}
		});
	};
	const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, update it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					await updateCourse({
						slug,
						updateData: {
							status: ECourseStatus.PENDING
								? ECourseStatus.APPROVED
								: ECourseStatus.PENDING,
							_destroy: false,
						},
						path: "/manage/course",
					});
					toast.success("Cập nhật trạng thái thành công!");
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Heading>Quản lý khóa học</Heading>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Thông tin</TableHead>
						<TableHead>Giá</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{course.length > 0 &&
						course.map((item) => {
							const courseStatusItem = courseStatus.find(
								(res) => res.value === item.status
							);
							return (
								<TableRow key={item.slug}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Image
												alt=""
												src={item.image}
												width={80}
												height={80}
												className="flex-shrink-0 size-16 rounded-lg object-cover"
											/>
											<div className="flex flex-col gap-1">
												<h3 className="font-bold text-base">{item.title}</h3>
												<h4 className="text-sm text-slate-500">
													{new Date(item.created_at).toLocaleDateString(
														"vi-VI"
													)}
												</h4>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="font-bold text-base">
											{item.price.toLocaleString()}đ
										</span>
									</TableCell>
									<TableCell>
										<button
											type="button"
											className={cn(
												commonClassNames.status,
												courseStatusItem?.className
											)}
											onClick={() => {
												handleChangeStatus(item.slug, item.status);
											}}
										>
											{courseStatusItem?.title}
										</button>
									</TableCell>
									<TableCell>
										<div className="flex gap-3">
											<Link
												href={`/manage/course/update-content?slug=${item.slug}`}
												className={commonClassNames.action}
											>
												<IconStudy />
											</Link>
											<Link
												href={`/course/${item.slug}`}
												target="_blank"
												className={commonClassNames.action}
											>
												<IconEye />
											</Link>
											<Link
												href={`/manage/course/update?slug=${item.slug}`}
												className={commonClassNames.action}
											>
												<IconEdit />
											</Link>
											<button
												className={commonClassNames.action}
												onClick={() => handleDeleteCourse(item.slug)}
											>
												<IconDelete />
											</button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			<div className="flex justify-end gap-3 mt-5">
				<button className={commonClassNames.paginationButton}>
					{IconArrowLeft}
				</button>
				<button className={commonClassNames.paginationButton}>
					{IconArrowRight}
				</button>
			</div>
		</div>
	);
};

export default CourseManage;
