import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex justify-center min-h-screen items-center">
			<Loader2 className="mr-2 h-10 w-10 animate-spin text-primary" />
		</div>
	);
}
