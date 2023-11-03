import React, { FC } from "react";

const Footer: FC = () => {
	return (
		<section className="border-t border-divider dark:bg-secondary-extradark bg-secondary-extralight">
			<footer className="layout-container flex flex-col items-center py-20">
				<p className="text-gray">
					Created by <a className="underline hover:text-default-color" href="https://danielbilek.com">
					Daniel Bílek
                    </a>
				</p>
			</footer>
		</section>
	);
};

export default Footer;
