"use client";
import { URLS } from "@/lib/urls";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface AccountLinkProps {
	href: string;
	label: string;
    icon: LucideIcon
}

const AccountLink: FC<AccountLinkProps> = ({ href, label, icon }) => {
	const pathname = usePathname();
	const isActive = pathname === `${URLS.ACCOUNT}${href}`
    const LinkIcon = icon

	return (
		<Link
			href={`${URLS.ACCOUNT}${href}`}
			className={cn(
			
				"text-gray hover:underline ease-in-out transition inline-flex gap-2 items-center",
				isActive && "text-default-color",
				
			)}
		>
            <LinkIcon className="w-5 h-5" />
			{label}
		</Link>
	);
};

export default AccountLink;
