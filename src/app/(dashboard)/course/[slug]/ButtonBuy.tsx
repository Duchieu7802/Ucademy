"use client";
import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { buyCourse } from "@/lib/actions/user.actions";
import { TCourseUpdateParams } from "@/types";
import React from "react";
import { toast } from "react-toastify";

const ButtonBuy = ({ slug }: { slug: string }) => {
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
			<Button
				variant="primary"
				onClick={handleBuyCourse}
				className="w-full"
				type="submit"
			>
				Mua khóa học
			</Button>
		</div>
	);
};

export default ButtonBuy;
