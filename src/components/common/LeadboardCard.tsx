import { cn } from "@/lib/utils";
import { Leaderboard } from "@/types/userTypes";
import { AwardIcon, CrownIcon } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import avatar_placeholder from "public/avatar_placeholder.jpg";
import Avatar from "../ui/Avatar";

interface LeaderboardCardProps {
	data: Leaderboard;
	i: number;
}

const getIcon = (i: number) => {
	switch (i) {
		case 0:
			return CrownIcon;
		case 1:
			return AwardIcon;

		case 2:
			return AwardIcon;

		default:
			return AwardIcon;
	}
};

const LeadboardCard: FC<LeaderboardCardProps> = ({ data, i }) => {
	const { userId, statistics, playerName, avatarUrl } = data;
	const Icon = getIcon(i);

	return (
		<div
			className={cn(
				"border border-divider rounded-md p-5 bg-secondary-extralight dark:bg-secondary-extradark",
				!i && "border-yellow-500"
			)}
			key={userId}
		>
			<div className="flex items-center justify-between">
				<div className="flex gap-5 items-center">
					{!!Icon ? (
						<Icon className={cn("w-5 h-5", !i && "text-yellow-500")} />
					) : (
						<div className="w-5 h-5" />
					)}
					<div className="flex items-center gap-4">
						<Avatar src={avatarUrl} alt={playerName} />
						<h4 className="h4 sm:base">{playerName}</h4>
					</div>
				</div>
				<div className="flex gap-5 items-center">
					<p className="font-medium sm:small">{statistics.wins} W</p>
					<p className="text-gray sm:small"> {statistics.losts} L</p>
				</div>
			</div>
		</div>
	);
};

export default LeadboardCard;
