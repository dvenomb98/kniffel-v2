import { version } from "@/lib/config";
import { URLS } from "@/lib/urls";
import { BoxIcon } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

const Logo: FC = () => {
	return (
		<Link href={URLS.HOMEPAGE} className="flex gap-1 items-center">
			<BoxIcon className="w-5 h-5 text-primary" />
			<h1 className="font-medium h4">
				Yathzee <span className="small text-gray">beta v{version}</span>
			</h1>
		</Link>
	);
};

export default Logo;
