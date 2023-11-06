import React, { FC } from "react";
import AccountSidebarContent from "./AccountSidebarContent";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import { ExternalLinkIcon } from "lucide-react";

const AccountSidebar: FC = async () => {
	return (
		<div className="lg:col-span-2 sm:w-full flex flex-col gap-5">
			<div>
				<Link href={URLS.ACCOUNT} className="flex gap-2 items-center">
					
				<h4 className="underline">Account</h4>
				<ExternalLinkIcon className="w-4 h-4" />
				</Link>
			</div>
			<AccountSidebarContent />
		</div>
	);
};

export default AccountSidebar;
