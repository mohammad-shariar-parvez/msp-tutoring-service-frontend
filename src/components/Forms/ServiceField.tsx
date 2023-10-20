import FormSelectField, { SelectOptions } from './FormSelectField';
import { useServicesQuery } from '@/redux/api/serviceApi';

type ServiceFieldProps = {
  name: string;
  label: string;
};

const ServiceFiled = ({ name, label }: ServiceFieldProps) => {
  const { data, isLoading } = useServicesQuery({
    limit: 100,
    page: 1,
  });
  const services = data?.services;
  //@ts-ignore
  const serviceList = services?.map((service) => {
    return {
      label: service?.title,
      value: service?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={serviceList as SelectOptions[]}
    />
  );
};

export default ServiceFiled;
