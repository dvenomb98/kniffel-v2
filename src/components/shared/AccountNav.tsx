import React, { FC } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import { User2Icon } from "lucide-react";

const AccountNav: FC = () => {
	return (
		<Button asChild variant="ghost" size="icon">
			<Link href={URLS.ACCOUNT + "/personal-settings"}>
				<User2Icon className="w-4 h4" />
			</Link>
		</Button>
	);
};

export default AccountNav;
