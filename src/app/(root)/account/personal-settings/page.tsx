import AccountPageLayout from "@/components/account/AccountPageLayout";
import { getUserData} from "@/lib/server-utils";
import { NextPage } from "next";
import React from "react";
import PersonalSettings from "@/components/account/PersonalSettings";

const PersonalSettingsPage: NextPage = async () => {
	const { userData } = await getUserData();

	return (
		<AccountPageLayout header="Personal settings">
				<PersonalSettings userData={userData} />
		</AccountPageLayout>
	);
};

export default PersonalSettingsPage;
