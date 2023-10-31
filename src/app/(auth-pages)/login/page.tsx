import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import Tabs from "@/components/ui/Tabs";
import React, { FC } from "react";
import { BoxIcon } from "lucide-react";

enum Values {
	SIGN_IN = "sign-in",
	SIGN_UP = "sign_up",
}


const tabs = [
	{
		value: Values.SIGN_IN,
		children: <SignInForm />,
		label: "Sign in"
	},
	{
		value: Values.SIGN_UP,
		children: <SignUpForm />,
		label: "Sign up"
	},
];

const LoginPage: FC = async () => {
	return (
		<section className="page-container items-center w-full lg:w-[600px]">
			<div className="w-full">
				<div className="flex items-center gap-2 mb-2">
					<BoxIcon className="w-10 h-10 text-primary" />
					<h1 className="h1">Yathzee</h1>
				</div>
				<p className="text-gray h4">To access our online game, please Sign in or Sign up, <span className="text-default-color">for free!</span></p>
			</div>

			<div className="w-full border border-divider rounded-md p-5 shadow-lg dark:shadow-secondary-dark/80 shadow-secondary-light">
				<Tabs
					desktopFullWidth
					defaultValue="sign-in"
					tabs={tabs}
				/>
			</div>
		</section>
	);
};

export default LoginPage;
