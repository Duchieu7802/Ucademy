import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="wrapper grid  lg:grid-cols-[300px_minmax(0,_1fr)] ">
			<Sidebar></Sidebar>
			<main className="p-5">{children}</main>
		</div>
	);
};

export default layout;
