'use client';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio } from 'antd';
import CourseCard from '@/components/ui/CourseCard';
import {
  useServicesByCategoryQuery,
  useServicesQuery,
} from '@/redux/api/serviceApi';
import { IService } from '@/types';
import { locationOptions } from '@/constants/global';

type IDProps = {
  params: any;
};
const Services = ({ params }: IDProps) => {
  const { id } = params;
  const initailQuery: Record<string, any> = { serviceId: id };
  const [value, setValue] = useState(1);
  const [location, setLocation] = useState<string>('');
  const [query, setQuery] = useState({ ...initailQuery });
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');

  console.log('query---', query);
  const onChange = (e: RadioChangeEvent) => {
    setQuery({ ...query, ['location']: e.target.value });
    setValue(e.target.value);
  };
  const { data } = useServicesQuery(query);
  const coursesData = data?.services;
  console.log('HELLLOOOO', coursesData);

  return (
    <div className='container  '>
      <div className='grid grid-cols-4'>
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
