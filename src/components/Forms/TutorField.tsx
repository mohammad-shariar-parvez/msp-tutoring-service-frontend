import { useEffect } from 'react';
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

  const { data, isLoading, refetch } = useTutorsQuery({
    limit: 100,
    page: 1,
    location: locateTutor || undefined,
    subjectId: subjectId || undefined,
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
  // console.log(data);
  // console.log(tutorList);

  useEffect(() => {
    refetch();
  }, [locateTutor, refetch, subjectId]);

  return (
    <FormSelectField
      name={name}
      size='large'
      label={label}
      options={tutorList as SelectOptions[]}
      defaultValue={defaultValue}
    />
  );
};

export default TutorField;
