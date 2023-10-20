import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
	oldPassword: yup.string()
		.min(6, 'Password must be at least 6 characters')
		.max(32, 'Password must not exceed 32 characters')
		.required("Old Password is required"),
	newPassword: yup.string()
		.min(6, 'Password must be at least 6 characters')
		.max(32, 'Password must not exceed 32 characters')
		.required(" New Password is required"),
});