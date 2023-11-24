'use client';

import { locationOptions } from '@/constants/global';
import { ConfigProvider, Select } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options?: SelectOptions[];
  name?: string;
  size?: 'large' | 'small';
  myValue?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
};

const LocationSelector = ({
  name,
  size = 'large',
  myValue,
  placeholder = 'select',
  options,
  label,
  defaultValue,
  handleChange,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name='location'
        render={({ field: { value, onChange } }) => {
          return (
            // <Select
            //   onChange={handleChange ? handleChange : onChange}
            //   size={size}
            //   options={options}
            //   value={myValue ? myValue : value}
            //   style={{ width: '100%' }}
            //   placeholder={placeholder}
            //   defaultValue={defaultValue}
            // />
            <ConfigProvider
              theme={{
                token: {
                  fontSize: 16,
                  fontFamily: 'Rubik, sans-serif',
                },
              }}
            >
              <Select
                onChange={handleChange ? handleChange : onChange}
                placeholder='Location'
                style={{ width: 120 }}
                suffixIcon={null}
                allowClear
                bordered={false}
                value={myValue ? myValue : value}
                className='  w-full text-base font-medium text-start  '
                dropdownAlign={{ offset: [10, 20] }} // Adjust the offset as needed
                options={locationOptions}
              />
            </ConfigProvider>
          );
        }}
      />
    </>
  );
};

export default LocationSelector;
