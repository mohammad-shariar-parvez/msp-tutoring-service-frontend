import { useCategoriesQuery } from '@/redux/api/category';
import FormSelectField, { SelectOptions } from './FormSelectField';
import { ICategory } from '@/types';

type CategoryFieldProps = {
  name: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const CategoryField = ({ name, label, defaultValue }: CategoryFieldProps) => {
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
      defaultValue={defaultValue}
    />
  );
};

export default CategoryField;
