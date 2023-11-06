import AccountPageLayout from "@/components/account/AccountPageLayout";
import Avatar from "@/components/ui/Avatar";
import { getScore, getUserData } from "@/lib/server-utils/userUtils";
import { ChevronsDown, ChevronsUp } from "lucide-react";

import { FC } from "react";

export const dynamic = "force-dynamic"

const AccountPage: FC = async () => {

	const { userData } = await getUserData(true);
	const scores = await getScore(userData.gameHistory || []);


	return (
		<AccountPageLayout header="Overview">
			<div className="flex gap-10 border-b pb-5 border-divider">
				<Avatar
					width={120}
					height={120}
					sizeClasses="w-32 h-32 sm:w-20 sm:h-20"
					alt={userData.playerName}
					src={userData.avatarUrl}
				/>

				<div>
					<p className="h4 font-medium">{userData.playerName}</p>
					<p className="text-gray">{userData.email}</p>
					<p className="text-gray text-[10px]">{userData.userId}</p>
				</div>
			</div>

			<div className="flex flex-col gap-5">
				<h3 className="h3">Statistics</h3>
				<div className="flex justify-between sm:flex-col gap-2">
					<p className="h4 text-gray inline-flex gap-2 items-center">
						<ChevronsUp className="w-5 h-5 text-success" />
						Highest achieved score: <span className="text-default-color">{scores.highest}</span>
					</p>
					<p className="h4 text-gray inline-flex gap-2 items-center">
						<ChevronsDown className="w-5 h-5 text-error" />
						Lowest achieved score: <span className="text-default-color">{scores.lowest}</span>
					</p>
				</div>
				<div className="flex  gap-10">
					<p className="text-gray">
						Wins: <span className="text-default-color">{userData.statistics.wins}</span>
					</p>
					<p className="text-gray">
						Losts: <span className="text-default-color">{userData.statistics.losts}</span>
					</p>
				</div>
			</div>
		</AccountPageLayout>
	);
};

export default AccountPage;
