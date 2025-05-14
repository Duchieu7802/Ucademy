"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreateCourse } from "@/lib/actions/course.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const formSchema = z.object({
	title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
	slug: z.string().optional(),
});

function CourseAddNew() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			slug: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsSubmitting(true);
		try {
			const data = {
				title: values.title,
				slug:
					values.slug ||
					slugify(values.title, {
						lower: true,
						locale: "vi",
					}),
			};
			console.log(data);
			const res = await CreateCourse(data);
			if (res?.success) {
				toast.success("Tạo khóa học thành công");
			}
			if (res?.data) {
				router.push(`/manage/course/update?slug=${res.data.slug}`);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				setIsSubmitting(false);
			}, 3000);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
				<div className="grid grid-cols-2 gap-8 mt-10 mb-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tên khóa học </FormLabel>
								<FormControl>
									<Input placeholder="Tên khóa học" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Đường dẫn khóa học </FormLabel>
								<FormControl>
									<Input placeholder="khoa-hoc-lap-trinh" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					isLoading={isSubmitting}
					type="submit"
					disabled={isSubmitting}
					className="w-30"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
export default CourseAddNew;
