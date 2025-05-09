import React from "react";
import { menuItems } from "@/constants";

import { TMenuItemProps } from "@/types";
import { ActiveLink } from "../common";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
const Sidebar = () => {
	return (
		<div className="p-5 border-r border-r-gray-200 bg-white h-screen flex flex-col dark:bg-grayDarker dark:border-gray-200/10">
			<a href="./" className="font-bold mb-5 text-3xl inline-block">
				Ucademy
			</a>
			<ul className="flex flex-col gap-2">
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						icon={item.icon}
						title={item.title}
						url={item.url}
					></MenuItem>
				))}
			</ul>
			<div className="mt-auto flex items-center justify-end ">
				<ModeToggle></ModeToggle>
				<UserButton />
			</div>
		</div>
	);
};
function MenuItem({ url = "/", title = "", icon }: TMenuItemProps) {
	return (
		<li>
			<ActiveLink url={url}>
				{icon}
				{title}
			</ActiveLink>
		</li>
	);
}
export default Sidebar;
