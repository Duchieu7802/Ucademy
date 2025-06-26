"use client";
import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { buyCourse } from "@/lib/actions/user.actions";
import { TCourseUpdateParams } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import React from "react";
import { toast } from "react-toastify";

const ButtonBuy = ({ slug }: { slug: string }) => {
	const { userId } = useAuth();
	const handleBuyCourse = async () => {
		const res = await buyCourse({ slug });
		if (res?.success) {
			toast.success(res.message);
		} else {
			toast.error(res?.message);
		}
	};

	return (
		<div>
			{!userId ? (
				<Link href="/sign-in">
					<Button type="button" className="w-full" variant="primary">
						Đăng nhập
					</Button>
				</Link>
			) : (
				<Button
					variant="primary"
					onClick={handleBuyCourse}
					className="w-full"
					type="submit"
				>
					Mua khóa học
				</Button>
			)}
		</div>
	);
};

export default ButtonBuy;
