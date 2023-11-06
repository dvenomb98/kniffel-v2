"use client";

import { ReactNode } from "react";
import * as yup from "yup";

const MAX_FILE_SIZE = 4
const getFileSizeInMB = (value: File) => value.size / 1024 ** 2

const messages = Object.freeze({
	required: "Required!",
	invalidDate: "Invalid date!",
	invalidEmail: "Invalid email format!",
	fileSize: "The file is too large. Maximum size for file is 4 MB.",
});

const useFieldValidation = () => {
	const yupField = Object.freeze({
		string: {
			required: yup.string().nullable().required(messages.required),
			optional: yup.string().nullable(),
		},
		date: {
			required: yup.date().required(messages.required).typeError(messages.invalidDate),
			optional: yup.date().nullable().typeError(messages.invalidDate),
		},
		email: {
			required: yup.string().email(messages.invalidEmail).nullable().required(messages.required),
			optional: yup.string().email(messages.invalidEmail).nullable(),
		},
		checkbox: {
			required: yup.bool().oneOf([true], messages.required),
			optional: yup.bool().nullable(),
		},
		select: {
			required: (options: { value: string; label: string | ReactNode }[]) =>
				yup
					.string()
					.oneOf(options.map((op) => op.value))
					.required(messages.required)
					.nullable(),
			optional: yup.mixed(),
		},
		file: {
			required: yup
				.mixed()
				.required(messages.required)
				.test("fileSize", messages.fileSize, (value: any) => {
					const fileSizeMB = getFileSizeInMB(value)
					return fileSizeMB <= MAX_FILE_SIZE;
				}),
			optional: yup.mixed().test("fileSize", messages.fileSize, (value: any) => {
				if (!value) return true;
				const fileSizeMB = getFileSizeInMB(value)
				return fileSizeMB <= MAX_FILE_SIZE;
			}).nullable()
		},
	});

	return yupField;
};

export default useFieldValidation;
