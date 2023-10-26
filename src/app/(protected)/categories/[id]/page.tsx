'use client';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Radio } from 'antd';
import CourseCard from '@/components/ui/CourseCard';
import {
  useServicesByCategoryQuery,
  useServicesQuery,
} from '@/redux/api/serviceApi';
import { IService } from '@/types';
import { locationOptions } from '@/constants/global';
import {
  SearchOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
type IDProps = {
  params: any;
};
const Services = ({ params }: IDProps) => {
  const { id } = params;
  const initailQuery: Record<string, any> = { serviceId: id };
  const [value, setValue] = useState('');
  const [formReset, setFormReset] = useState<boolean>(false);
  const [query, setQuery] = useState({ ...initailQuery });
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');

  const onChange = (e: RadioChangeEvent) => {
    setQuery({ ...query, ['location']: e.target.value });
    setValue(e.target.value);
  };
  const { data } = useServicesQuery(query);
  const coursesData: IService[] = (data?.services || []) as IService[];

  console.log('HELLLOOOO', coursesData);

  const publicOnSubmit = async (values: any) => {
    console.log(values);
    setQuery({ ...query, ...values });
    setMinPrice(values.minPrice);
    setMaxPrice(values.maxPrice);
  };

  const resetFilters = async () => {
    setFormReset(true);
    setMaxPrice('');
    setMinPrice('');
    setValue('');
    setQuery({ serviceId: id });
  };
  return (
    <div className='container  '>
      <div className='grid grid-cols-4 gap-6'>
        <div className=''>
          <Radio.Group
            onChange={onChange}
            value={value}
            className=' flex flex-col gap-4'
          >
            {locationOptions.map((location, index) => (
              <Radio key={index} value={location.value}>
                {location.label}
              </Radio>
            ))}
          </Radio.Group>
          <Form submitHandler={publicOnSubmit} noReset={formReset}>
            <div className='flex justify-between items-center w-full space-x-1 py-4'>
              <FormInput
                name='minPrice'
                size='small'
                type='number'
                placeholder='Min Price'
              />

              {/* <!-- Address Field  --> */}

              <FormInput
                name='maxPrice'
                size='small'
                type='number'
                placeholder='Max Price'
              />
              {/* <!-- Find Button  --> */}

              <Button
                htmlType='submit'
                className=' bg-transparent  font-bold text-md p-0 m-0 rounded-md  cursor-pointer transition duration-700 border-0 '
              >
                <SearchOutlined />
              </Button>
            </div>
            <Button onClick={resetFilters} htmlType='submit' className='   '>
              Reset
            </Button>
          </Form>
        </div>
        <div className='col-span-3'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {coursesData?.map((course: IService) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
