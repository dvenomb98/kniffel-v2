"use client";
import { UserData } from "@/types/userTypes";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Input } from "../ui/form/Input";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/useToast";
import { API_URLS } from "@/lib/urls";
import { baseUrl } from "@/lib/config";
import Avatar from "../ui/Avatar";
import useFieldValidation from "@/hooks/useValidation";
import * as yup from "yup";
import AvatarInput from "../ui/form/FileInput";

interface PersonalSettingsProps {
	userData: UserData;
}

const PersonalSettings: FC<PersonalSettingsProps> = ({ userData }) => {
	const { toast } = useToast();
	const yupField = useFieldValidation();

	const schema = yup.object({
		playerName: yupField.string.required,
		avatar: yupField.file.optional,
	});

	const { playerName, email, avatarUrl } = userData;

	const handleSubmit = async (playerName: string, avatar: string | null) => {
		const formData = new FormData();

		formData.append("playerName", playerName);
		if (avatar) {
			formData.append("avatar", avatar);
		}

		const response = await fetch(baseUrl + API_URLS.HANDLE_USER_DATA_CHANGE, {
			body: formData,
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
			initialValues={{ playerName, email, avatar: null }}
			onSubmit={async (values) => await handleSubmit(values.playerName, values.avatar)}
			validationSchema={schema}
		>
			{({ isSubmitting}) => (
				<Form className="flex flex-col gap-5">
					<Input name="email" label="Email" disabled />
					<Input name="playerName" label="Player name" />
					<AvatarInput name="avatar" alt={playerName} avatarUrl={avatarUrl} description="It can take up to one hour for avatar changes to reappear" />
					<Button className="w-[200px]" loading={isSubmitting} type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default PersonalSettings;
