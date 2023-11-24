'use client';

import { getErrorMessageByPropertyName } from '@/utils/schema-validator';
import { ConfigProvider, Input } from 'antd';
import { spawn } from 'child_process';
import { useFormContext, Controller } from 'react-hook-form';
interface IInput {
  name?: string;
  type?: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  bordered?: boolean;
}

const SearchInput = ({
  name,
  type,
  size = 'large',
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  bordered = true,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, 'course');

  return (
    <>
      {required ? (
        <span
          style={{
            color: 'red',
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        control={control}
        name='course'
        render={({ field }) => (
          //   <Input
          //     type={type}
          //     size={size}
          //     placeholder={placeholder}
          //     {...field}
          //     value={value ? value : field.value}
          //     bordered={bordered}
          //   />
          <ConfigProvider
            theme={{
              token: {
                fontSize: 16,
                fontFamily: 'Rubik, sans-serif',
              },
            }}
          >
            <Input
              {...field}
              id='course'
              name='course'
              type='text'
              placeholder='Course'
              bordered={false}
              // value={field.value}
              // onChange={(e) => setCourse(e.target.value)}
              className='p-1 md:p-3 pl-2 w-full text-base  bg-white'
            />
          </ConfigProvider>
        )}
      />
      <small style={{ color: 'red' }}>{errorMessage}</small>
    </>
  );
};

export default SearchInput;
