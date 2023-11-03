import React, { FC } from "react";
import { Skeleton } from "../ui/Skeleton";

const LeaderboardSkeletons: FC = () => {
	return (
		<div className="flex flex-col gap-10 py-5">
			<Skeleton className="h-[90px] w-full" />
			<div className="flex flex-col gap-5">
				<Skeleton className="w-full h-[70px]" />
				<Skeleton className="w-full h-[70px]" />
				<Skeleton className="w-full h-[70px]" />
			</div>
		</div>
	);
};

export default LeaderboardSkeletons;
