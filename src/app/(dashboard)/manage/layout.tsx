import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserRole } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const { userId, redirectToSignIn } = await auth();
	const user = await getUserInfo({ userId });
	if (!userId) return redirectToSignIn();
	if (user?.role !== EUserRole.ADMIN) return <PageNotFound />;
	return <div>{children}</div>;
};
export default AdminLayout;
