"use client";
import { UserData, UserMetaData } from "@/types/userTypes";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { Input } from "../ui/form/Input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/form/Checkbox";
import { useToast } from "@/hooks/useToast";
import client from "@/lib/supabase/client";
import { API_URLS } from "@/lib/urls";
import useFieldValidation from "@/hooks/useValidation";
import * as yup from "yup";

export interface SignUpValues {
	email: string;
	password: string;
	confirmPassword: string;
	data: UserMetaData;
}

const initialValues: SignUpValues = {
	email: "",
	password: "",
	confirmPassword: "",
	data: {
		playerName: "",
		condition_agreement: false,
	},
};

const SignUpForm: FC = () => {
	const { toast } = useToast();
	const yupField = useFieldValidation();
	const schema = yup.object({
		email: yupField.email.required,
		password: yupField.string.required.min(6, "Minimum password length is 6"),
		confirmPassword: yupField.string.required.oneOf([yup.ref("password")], "Password must match"),
		data: yup.object({
			playerName: yupField.string.required,
			condition_agreement: yupField.checkbox.required,
		}),
	});

	const handleSignUp = async (values: SignUpValues, resetForm: () => void) => {
		const { email, password, data } = values;
		const { data: signUpData, error } = await client.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${process.env.NEXT_PUBLIC_MAIN_URL}${API_URLS.CALLBACK}`,
				data,
			},
		});
		if (error) {
			toast({ title: "Error happened", description: error.message, variant: "destructive" });
			return;
		}

		if (!signUpData?.user?.identities?.length) {
			toast({
				title: "Email already exists",
				description: "Sign in or use different email",
				variant: "destructive",
			});
			return;
		}
		const { error: insertError } = await client.from("users_table").insert([
			{
				email: signUpData.user.email,
				userId: signUpData.user.id,
				playerName: data.playerName,
				statistics: {
					wins: 0,
					losts: 0,
				},
			},
		] as UserData[]);

		if (insertError) {
			toast({ title: "Error happened", description: insertError.message, variant: "destructive" });
			return;
		}

		toast({
			title: "Registration sucessfully completed!",
			description: "Check your email to confirm your registration",
			variant: "success",
		});
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={async (values, { resetForm }) => handleSignUp(values, resetForm)}
		>
			{({ isSubmitting }) => (
				<Form className="flex flex-col gap-5">
					<Input name="email" label="Email*" />
					<Input name="data.playerName" label="Your player name*" />
					<Input name="password" label="Password*" type="password" />
					<Input name="confirmPassword" label="Confirm password*" type="password" />
					<Checkbox
						label="I accept and agree to the Terms of Use*"
						name="data.condition_agreement"
						description="Learn about our Terms & Conditions"
					/>
					<Button type="submit" loading={isSubmitting}>
						Sign up
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default SignUpForm;
