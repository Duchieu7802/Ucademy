"use client";
import { adminMenuItems, userMenuItems } from "@/constants";
import React, { useEffect } from "react";
import { MenuItem } from "./Sidebar";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserRole } from "@/types/enums";
import { useAuth } from "@clerk/nextjs";

const MenuItemSide = () => {
	const { userId } = useAuth();
	const [userRole, setUserRole] = React.useState<EUserRole>(EUserRole.USER);
	useEffect(() => {
		if (!userId) return;
		const fetchUser = async () => {
			try {
				const mongoUser = await getUserInfo({ userId });
				console.log("🚀 ~ fetchUser ~ mongoUser:", mongoUser);
				// const user = JSON.parse(JSON.stringify(mongoUser));

				// console.log("🚀 ~ fetchUser ~ user:", user);
				// setUserRole(user?.role ?? EUserRole.USER);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUser();
	}, [userId]);
	if (userRole !== EUserRole.ADMIN)
		// console.log("🚀 ~ MenuItemSide ~ userRole:", userRole);
		return (
			<>
				{userMenuItems.map((item, index) => (
					<MenuItem
						key={index}
						url={item.url}
						title={item.title}
						icon={item.icon}
					></MenuItem>
				))}
			</>
		);
	return (
		<>
			{adminMenuItems.map((item, index) => (
				<MenuItem
					key={index}
					url={item.url}
					title={item.title}
					icon={item.icon}
					onlyIcon
				></MenuItem>
			))}
		</>
	);
};

export default MenuItemSide;
