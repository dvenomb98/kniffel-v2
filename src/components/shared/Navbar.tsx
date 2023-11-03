
import React, { FC } from "react";
import Logo from "./Logo";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import AccountNav from "./AccountNav";

const Navbar: FC = async () => {
	return (
		<section className="border-b border-divider p-5">
			<nav className="layout-container flex items-center justify-between">
				<Logo />
				<div className="flex items-center gap-2">
					<AccountNav />
					<ThemeSwitcher />
				</div>
			</nav>
		</section>
	);
};

export default Navbar;
