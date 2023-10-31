import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
	
	return (
		<div className="flex gap-10 items-start h-[600px]">
			<Skeleton className="h-full basis-2/3" />
			<Skeleton className="h-full basis-1/3" />
		</div>
	);
}
