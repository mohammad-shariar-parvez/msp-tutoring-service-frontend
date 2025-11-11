'use client';
import { ConfigProvider, DatePicker, DatePickerProps, Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';

type UMDatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: 'large' | 'small';
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size = 'large',
}: UMDatePikerProps) => {
  const { control, setValue } = useFormContext();

const handleOnChange: DatePickerProps['onChange'] = (date, dateString) => {
  const singleDateString = Array.isArray(dateString) ? dateString[0] : dateString;
  if (onChange) onChange(date, singleDateString);
  setValue(name, date);
};

  return (
    <div>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
                colorPrimary: '#274279',
                colorLink: '#274279',
                controlOutline: 'transparent',
              },
              components: {
                DatePicker: {
                  colorBorder: 'none',
                  /* here is your component tokens */
                },
              },
            }}
          >
            <DatePicker
              defaultValue={dayjs(field.value) || Date.now()}
              size={size}
              onChange={handleOnChange}
              style={{ width: '100%' }}
            />
          </ConfigProvider>
        )}
      />
    </div>
  );
};

export default FormDatePicker;
