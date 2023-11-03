"use client";
import { UserData } from "@/types/userTypes";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Input } from "../ui/form/Input";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { API_URLS } from "@/lib/urls";
import { baseUrl } from "@/lib/config";

interface PersonalSettingsProps {
	userData: UserData;
}

const PersonalSettings: FC<PersonalSettingsProps> = ({ userData }) => {
	const { toast } = useToast();

	const { playerName, email} = userData;

	const handleSubmit = async (playerName: string) => {
		const response = await fetch(baseUrl + API_URLS.HANDLE_USER_DATA_CHANGE, {
			body: JSON.stringify(playerName),
			method: "POST",
		});
		if (!response.ok) {
			toast({
				title: "Error happened",
				description: "Sorry, something went wrong. Try it again later.",
				variant: "destructive",
			});
			return;
		}
		toast({
			title: "Success",
			description: "Your data were sucessfully changed.",
			variant: "success",
		});
	};

	return (
		<Formik
			initialValues={{ playerName, email }}
			onSubmit={async (values) => await handleSubmit(values.playerName)}
		>
			{({ isSubmitting }) => (
				<Form className="flex flex-col gap-5">
					<Input name="email" label="Email" disabled />
					<Input name="playerName" label="Player name" />
					<Button className="w-[200px]" loading={isSubmitting} type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default PersonalSettings;
