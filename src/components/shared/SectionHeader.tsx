import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

interface SectionHeaderProps {
	title: string | ReactNode;
	description?: string | ReactNode;
	className?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, description, className }) => {
	return (
		<div className={cn("flex flex-col gap-5", className)}>
			<h1 className="h1">{title}</h1>
			{!!description && <h4 className="h4 text-gray">{description}</h4>}
		</div>
	);
};

export default SectionHeader;