type TActiveLinkProps = {
	url: string;
	children: React.ReactNode;
};
type TMenuItemProps = {
	url: string;
	title: string;
	icon: React.ReactNode;
};
//User
type TCreateUserParams = {
	clerkId: string;
	username: string;
	email_address: string;
	name?: string;
	avatar?: string;
};
export { TActiveLinkProps, TMenuItemProps, TCreateUserParams };
