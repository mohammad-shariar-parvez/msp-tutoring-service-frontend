import FormSelectField, { SelectOptions } from './FormSelectField';
import { useTutorsQuery } from '@/redux/api/tutorApi';

type ServiceFieldProps = {
  name: string;
  label?: string;
  locateTutor?: string;
  subjectId?: string;
  defaultValue?: SelectOptions;
};

const TutorField = ({
  name,
  label,
  locateTutor,
  subjectId,
  defaultValue,
}: ServiceFieldProps) => {
  // console.log(locateTutor);
  console.log('YOO', locateTutor, subjectId);

  const { data, isLoading } = useTutorsQuery({
    limit: 100,
    page: 1,
    location: locateTutor,
    subjectId,
  });
  // console.log(data);

  const tutors = data?.tutors;
  //@ts-ignore
  const tutorList = tutors?.map((tutor) => {
    return {
      label: tutor?.firstName,
      value: tutor?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={tutorList as SelectOptions[]}
      defaultValue={defaultValue}
    />
  );
};

export default TutorField;
