import FormSelectField, { SelectOptions } from './FormSelectField';
import { useTutorsQuery } from '@/redux/api/tutorApi';

type ServiceFieldProps = {
  name: string;
  label?: string;
  locateTutor?: string;
};

const TutorField = ({ name, label, locateTutor }: ServiceFieldProps) => {
  // console.log(locateTutor);

  const { data, isLoading } = useTutorsQuery({
    limit: 100,
    page: 1,
    location: locateTutor,
  });
  const tutors = data?.tutors;
  //@ts-ignore
  const categoryList = tutors?.map((tutor) => {
    return {
      label: tutor?.firstName,
      value: tutor?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={categoryList as SelectOptions[]}
    />
  );
};

export default TutorField;
