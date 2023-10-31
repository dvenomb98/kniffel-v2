"use client";
import { cn } from "@/lib/utils";
import React, { FC, Fragment, ReactNode, useMemo, useState } from "react";

interface TabsProps {
	defaultValue?: string;
	tabs: {
		value: string;
		label: string
		children: ReactNode
	}[];
	desktopFullWidth?: boolean
}

const Tabs: FC<TabsProps> = ({ defaultValue, tabs, desktopFullWidth }) => {
	const [isActive, setIsActive] = useState<string>(defaultValue || tabs[0].value);

	const content = useMemo(() => {
		return tabs.filter((c) => c.value === isActive);
	}, [isActive, tabs]);

	return (
		<div className="flex flex-col gap-5">
			<div className="w-full border-b border-divider flex gap-2">
				{tabs.map((tab) => (
					<button
						className={cn(
							desktopFullWidth ? "lg:w-full" : "lg:min-w-[150px]",
							"pb-2 sm:w-full sm:small",
							tab.value === isActive ? "text-default-color border-b" : "text-gray"
						)}
						key={tab.value}
						onClick={() => setIsActive(tab.value)}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className="flex flex-col gap-5">
				{content.map((c) => (
					<Fragment key={c.value}>{c.children}</Fragment>
				))}
			</div>
		</div>
	);
};

export default Tabs;
