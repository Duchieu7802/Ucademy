import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
	return <h1 className="font-bold mb-5 text-2xl lg:text-3xl">{children}</h1>;
};

export default Heading;
