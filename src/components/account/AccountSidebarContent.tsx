"use client"
import React, { FC } from "react";
import AccountLink from "./AccountLink";
import { KeyRoundIcon, LineChartIcon, User2Icon } from "lucide-react";

const navTabs = [
	{
		href: "/personal-settings",
		label: "Personal settings",
        icon: User2Icon
	},
	{
		href: "/game-history",
		label: "Game history",
        icon: LineChartIcon
	},
	// {
	// 	href: "/password-reset",
	// 	label: "Password change",
    //     icon: KeyRoundIcon
	// },
];

const AccountSidebarContent: FC = () => {
	return (
		<div className="flex flex-col gap-4">
			{navTabs.map((tab) => (
				<AccountLink key={tab.href} {...tab} />
			))}
		</div>
	);
};

export default AccountSidebarContent;
