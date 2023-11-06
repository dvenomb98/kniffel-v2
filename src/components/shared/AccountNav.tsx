"use client";
import React, { FC } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import { LogOutIcon, User2Icon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { useToast } from "@/hooks/useToast";
import client from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const AccountNav: FC = () => {
	const { toast } = useToast();
	const { push } = useRouter();

	const handleSignOut = async () => {
		const { error } = await client.auth.signOut();
		if (error) {
			toast({
				title: "Error happened",
				description: "We could not sign out current user. Please try it again, later.",
			});
			return;
		}

		push(URLS.LOGIN);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<User2Icon className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="">
				<DropdownMenuItem className="py-3" asChild role="link">
					<Link href={URLS.ACCOUNT} className="flex gap-3 items-center">
						<User2Icon className="w-4 h-4" />
						<span>Account</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={handleSignOut}
					className="flex gap-3 items-center p-3"
					role="button"
				>
					<LogOutIcon className="w-4 h-4" />
					<span>Sign out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AccountNav;
