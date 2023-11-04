import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { FC } from "react";
import avatar_placeholder from "public/avatar_placeholder.jpg";

interface AvatarProps {
	src: string | null;
	width?: number;
	height?: number;
	alt: string;
	sizeClasses?: string;
}

const Avatar: FC<AvatarProps> = ({ src, alt, width, height, sizeClasses }) => {
	return (
		<Image
			src={src || avatar_placeholder}
			width={width || 40}
			height={height || 40}
			className={cn(
				"object-cover object-center rounded-full",
				sizeClasses ? sizeClasses : "w-10 h-10"
			)}
			alt={alt}
		/>
	);
};

export default Avatar;
