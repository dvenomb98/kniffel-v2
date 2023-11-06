import React, { FC } from "react";
import { Skeleton } from "../ui/Skeleton";

const CurrentGamesSkeletons: FC = () => {
	return (
		<div className="flex flex-col gap-1 py-5">
			<Skeleton className="w-full h-[70px]" />
			<Skeleton className="w-full h-[70px]" />
			<Skeleton className="w-full h-[70px]" />
			<Skeleton className="w-full h-[70px]" />
		</div>
	);
};

export default CurrentGamesSkeletons;
