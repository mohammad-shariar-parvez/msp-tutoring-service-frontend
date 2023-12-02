import * as yup from "yup";

export const subjectSchema = yup.object().shape({
	title: yup
		.string()
		.transform((value, originalValue) => (typeof originalValue === 'string' ? originalValue.trim() : originalValue))
		.test('no-leading-trailing-space', 'Title must not contain leading or trailing spaces', (value) => !value || value === value.trim())
		.max(25, 'Title must not exceed 25 characters')
		.required('Title is required'),
});