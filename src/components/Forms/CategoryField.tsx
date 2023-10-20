import { useCategoriesQuery } from '@/redux/api/category';
import FormSelectField, { SelectOptions } from './FormSelectField';
import { ICategory } from '@/types';

type ServiceFieldProps = {
  name: string;
  label: string;
};

const CategoryField = ({ name, label }: ServiceFieldProps) => {
  const { data, isLoading } = useCategoriesQuery({
    limit: 100,
    page: 1,
  });
  const categories = data?.categories;
  //@ts-ignore
  const categoryList = categories?.map((category) => {
    return {
      label: category?.title,
      value: category?.id,
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

export default CategoryField;
