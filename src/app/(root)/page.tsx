import HomepageTabs from "@/components/common/HomepageTabs";
import SectionHeader from "@/components/shared/SectionHeader";
import React, { FC } from "react";

const Homepage: FC = () => {
	return (
		<section className="page-container">
			<SectionHeader
				title="Roll, Score, Win! - Yathzee Online"
				description="Dive into the world of Yathzee Online! Challenge friends or face global opponents as you roll the dice for the ultimate high score. Strategize, take risks, and experience the thrill of the game right from your screen. Ready to roll?"
			/>
			<HomepageTabs />
		</section>
	);
};

export default Homepage;
