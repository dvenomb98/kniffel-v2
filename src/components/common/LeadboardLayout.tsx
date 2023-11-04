import { getLeaderBoardData } from "@/lib/server-utils";
import React, { FC } from "react";
import { RocketIcon } from "lucide-react";
import LeadboardCard from "./LeadboardCard";

const LeaderboardLayout: FC = async () => {
	const dataLeaderboards = await getLeaderBoardData();

	return (
		<section className="flex flex-col gap-10 py-5">
			<div>
				<div className="flex gap-5 items-center">
					<RocketIcon className="w-10 h-10 text-primary" />
					<h3 className="h2">Leaderboards</h3>
				</div>
				<h4 className="text-gray mt-5 h4">Top 10 ranked players</h4>
			</div>
			<div className="flex flex-col gap-5">
				{dataLeaderboards.map((item, index) => (
					<LeadboardCard key={item.userId} data={item} i={index} />
				))}
			</div>
		</section>
	);
};

export default LeaderboardLayout;
