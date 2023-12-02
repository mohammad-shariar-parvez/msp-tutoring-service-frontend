import { useCoursesQuery } from '@/redux/api/courseApi';
import FormSelectField, { SelectOptions } from './FormSelectField';
import { useSubjectsQuery } from '@/redux/api/subjectApi';

type CourseFieldProps = {
  name: string;
  label: string;
};

const CourseField = ({ name, label }: CourseFieldProps) => {
  const { data, isLoading } = useSubjectsQuery({
    limit: 100,
    page: 1,
  });

  //@ts-ignore
  const subjects = (data?.subjects).map((sub: { title: any; id: any }) => {
    return {
      label: sub.title,
      value: sub.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={subjects as SelectOptions[]}
    />
  );
};

export default CourseField;
