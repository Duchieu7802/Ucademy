import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
	return <div className="p-5 text-3xl font-bold ">{children}</div>;
};

export default Heading;
