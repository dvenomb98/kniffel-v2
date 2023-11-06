"use client";
import React, { FC, useState } from "react";
import { Button } from "../ui/Button";
import { createNewGameSession } from "@/lib/game/utils";
import { useToast } from "@/hooks/useToast";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_MAIN_URL;

const CreateGameSession: FC = () => {
	const [sessionUrl, setSessionUrl] = useState<string>("");
	const { toast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);

	const handleCreateGame = async () => {
		setLoading(true);
		const url = await createNewGameSession();
		if (!url) {
			toast({
				title: "Sorry, something went wrong!",
				description: "Try it again later, please",
				variant: "destructive",
			});
			setLoading(false)
			return;
		}
		setSessionUrl(url);
		setLoading(false);
		toast({
			title: "Game sucessfully created!",
			description: "Follow instructions displayed on current page",
			variant: "success",
		});
	};

	return (
		<div className="h-56 w-full border border-divider rounded-md flex items-center justify-center bg-secondary-extralight dark:bg-secondary-extradark">
			{sessionUrl ? (
				<div className="flex flex-col gap-5 text-center">
					<h4 className="h4">Share this link to start the game</h4>
					<Link className="text-gray sm:small" href={sessionUrl}>
						{siteUrl + sessionUrl}
					</Link>
					<Button size="lg" asChild variant="outline">
						<Link href={sessionUrl}>Enter the game</Link>
					</Button>
				</div>
			) : (
				<Button loading={loading} onClick={handleCreateGame} size="lg">
					Create a new game
				</Button>
			)}
		</div>
	);
};

export default CreateGameSession;
