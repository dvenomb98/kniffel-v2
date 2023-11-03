import React, { FC } from "react";
import AccountSidebarContent from "./AccountSidebarContent";

const AccountSidebar: FC = async () => {
	return (
		<div className="lg:col-span-2 sm:w-full flex flex-col gap-5">
			<div>
				<h4 className="font-bold underline">Account</h4>
			</div>
			<AccountSidebarContent />
		</div>
	);
};

export default AccountSidebar;
