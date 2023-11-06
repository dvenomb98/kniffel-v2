import React, { FC, useEffect, useState } from "react";
import Avatar from "../Avatar";
import { Input } from "./Input";
import { useField, useFormikContext } from "formik";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	avatarUrl: string | null;
	alt: string;
	description?: string
}

const AvatarInput: FC<InputProps> = ({ name, avatarUrl, label, alt, description, ...props }) => {
	const [selectedFile, setSelectedFile] = useState<string>();
	const { setFieldValue, values } = useFormikContext<any>();
	const fieldValue = values?.[name];
    const id = `${name}-${name}`;

	useEffect(() => {
		if (!fieldValue) {
			setSelectedFile(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(fieldValue);
		setSelectedFile(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [fieldValue]);
	
	return (
		<div className="flex flex-col gap-1.5 w-full">
			<label htmlFor={id} className="text-gray small">
				Upload avatar
			</label>
			<div className="flex gap-4 items-center w-full">
				<Avatar src={selectedFile || avatarUrl} alt={alt} />
				<Input
					onChange={(e) => setFieldValue(name, e.target.files?.[0])}
					name={name}
					className="w-full"
					type="file"
					value={undefined}
					accept="image/png, image/jpeg, image/webp, image/jpg"
					{...props}
				/>
			</div>
			<span className="text-gray small">{description}</span>
		</div>
	);
};

export default AvatarInput;
