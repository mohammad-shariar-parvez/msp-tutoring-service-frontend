import { useCategoriesQuery } from '@/redux/api/category';
import FormSelectField, { SelectOptions } from './FormSelectField';

type CategoryFieldProps = {
  name: string;
  label?: string;
  defaultValue?: SelectOptions;
};

const CategoryField = ({ name, label, defaultValue }: CategoryFieldProps) => {
  // console.log('HELLLLOOOOOOOOOOOO', name);
  // console.log('HELLLLOOOOOOOOOOOO', label);
  // console.log('HELLLLOOOOOOOOOOOO', defaultValue);

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
      size='large'
      options={categoryList as SelectOptions[]}
      defaultValue={defaultValue}
    />
  );
};

export default CategoryField;
