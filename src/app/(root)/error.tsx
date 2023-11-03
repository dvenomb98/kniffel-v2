"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// const reportEror = async (error: Error) => {
		// }
		// Log the error to an error reporting service
	}, [error]);

	return (
		<section className="page-container min-h-screen flex items-center justify-center">
			<div className="border border-error flex flex-col sm:justify-center gap-5 lg:p-10 w-full sm:p-5 rounded-md bg-error-light/10">
				<div className="flex gap-5 items-center">
					<AlertTriangle className="w-10 h-10" />
					<h3 className="h3">Error happened</h3>
				</div>
				<ul className="text-gray">
					<li className="text-default-color h4">{error.message}</li>
					{!!error.name && <li>{error?.name as string}</li>}
					{!!error.cause && <li>{error?.cause as string}</li>}
				</ul>

				<Button
					variant="default"
					className="lg:w-96"
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
				>
					Try again
				</Button>
			</div>
		</section>
	);
}
