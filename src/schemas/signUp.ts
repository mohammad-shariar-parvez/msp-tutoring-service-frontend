import * as yup from "yup";
export const signUpSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.transform((value, originalValue) => (typeof originalValue === 'string' ? originalValue.trim() : originalValue))
		.test('no-leading-trailing-space', 'Title must not contain leading or trailing spaces', (value) => !value || value === value.trim())
		.min(6, 'Password must be at least 6 characters')
		.max(32, 'Password must not exceed 32 characters')
		.required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirm Password is required'),
});