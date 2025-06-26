"use client";
import React from "react";

import { TMenuItemProps } from "@/types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import { IconUsers } from "../icons";
import Link from "next/link";
import MenuItemSide from "./MenuItem";
import { adminMenuItems } from "@/constants";

const Sidebar = () => {
	const { userId } = useAuth();
	return (
		<div className="hidden p-5 border-r border-r-gray-200 bg-white h-screen lg:flex flex-col bgDarkMode borderDarkMode">
			<a href="/" className="font-bold mb-5 text-3xl inline-block">
				Ucademy
			</a>
			<ul className="flex flex-col gap-2">
				{adminMenuItems.map((item, index) => (
					<MenuItem
						key={index}
						icon={item.icon}
						title={item.title}
						url={item.url}
					></MenuItem>
				))}
				{/* <MenuItemSide></MenuItemSide> */}
			</ul>
			<div className="mt-auto flex items-center justify-end gap-2 ">
				<ModeToggle></ModeToggle>
				{!userId ? (
					<Link href="/sign-in">
						<IconUsers></IconUsers>
					</Link>
				) : (
					<UserButton />
				)}
			</div>
		</div>
	);
};
export function MenuItem({
	url = "/",
	title = "",
	icon,
	onlyIcon,
}: TMenuItemProps) {
	return (
		<li>
			<ActiveLink url={url}>
				{icon}
				{onlyIcon ? null : title}
			</ActiveLink>
		</li>
	);
}
export default Sidebar;
