'use client';

import { ConfigProvider, Select } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
import { DownOutlined } from '@ant-design/icons';
export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: 'large' | 'small';
  // myValue?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  bordered?: boolean;
  suffixIcon?: boolean;
  dropDownAlign?: boolean;
  handleChange?: (el: string) => void;
};

const FormSelectField = ({
  name,
  size,

  placeholder = 'select',
  options,
  label,
  bordered = true,
  dropDownAlign = true,
  suffixIcon = false,
  defaultValue,
  handleChange,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          console.log(value);
          // console.log(myValue);
          // console.log('On change', onChange);

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
                size={size}
                suffixIcon={!suffixIcon ? <DownOutlined /> : null}
                options={options}
                value={value}
                allowClear
                style={{ width: '100%' }}
                placeholder={placeholder}
                dropdownAlign={
                  dropDownAlign ? { offset: [0, 0] } : { offset: [10, 20] }
                }
                bordered={bordered}

                // defaultValue={defaultValue}
              />
            </ConfigProvider>
          );
        }}
      />
    </>
  );
};

export default FormSelectField;
