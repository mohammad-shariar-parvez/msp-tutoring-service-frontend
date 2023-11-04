import { useCoursesQuery } from '@/redux/api/courseApi';
import FormSelectField, { SelectOptions } from './FormSelectField';

type CourseFieldProps = {
  name: string;
  label: string;
};

const CourseField = ({ name, label }: CourseFieldProps) => {
  const { data, isLoading } = useCoursesQuery({
    limit: 100,
    page: 1,
  });
  const courses = data?.courses;
  //@ts-ignore
  const courseList = courses?.map((course) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={courseList as SelectOptions[]}
    />
  );
};

export default CourseField;
