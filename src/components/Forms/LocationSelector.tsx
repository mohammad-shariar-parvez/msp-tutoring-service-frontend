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
  // myValue?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
};

const LocationSelector = ({
  name,
  size = 'large',
  // myValue,
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
            <ConfigProvider
              theme={
                {
                  // token: {
                  //   fontSize: 16,
                  //   fontFamily: 'Rubik, sans-serif',
                  // },
                }
              }
            >
              <Select
                onChange={(el) => {
                  onChange(el);
                  handleChange && handleChange(el);
                }}
                placeholder='Location'
                style={{ width: 100 }}
                suffixIcon={null}
                allowClear
                bordered={false}
                value={value}
                className='  w-full   '
                // dropdownAlign={{ offset: [10, 20] }} // Adjust the offset as needed
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
