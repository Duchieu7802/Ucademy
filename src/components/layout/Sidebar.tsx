import React from "react";
import { menuItems } from "@/constants";
import ActiveLink from "@/components/common/ActiveLink";
import { TMenuItemProps } from "@/types";
const Sidebar = () => {
	return (
		<div className="p-5 border-r border-r-gray-200 ">
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
