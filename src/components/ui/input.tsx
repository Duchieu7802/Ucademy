import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"flex outline-none h-10 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary transition-all dark:border-gray-200/10 bg-white dark:bg-grayDarker",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
