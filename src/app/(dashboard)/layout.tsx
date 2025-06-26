import MenuItemSide from "@/components/layout/MenuItem";
import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { adminMenuItems } from "@/constants";

import { auth } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
	const { userId } = await auth();

	return (
		<div className="wrapper block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px_minmax(0,_1fr)] ">
			<Sidebar></Sidebar>
			<ul className="flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16">
				{adminMenuItems.map((item, index) => (
					<MenuItem
						key={index}
						url={item.url}
						title={item.title}
						icon={item.icon}
						onlyIcon
					></MenuItem>
				))}
				{/* <MenuItemSide></MenuItemSide> */}
			</ul>

			<main className="p-5">{children}</main>
		</div>
	);
};

export default layout;
