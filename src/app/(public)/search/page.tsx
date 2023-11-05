'use client';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Empty, Input, Pagination, Radio } from 'antd';
import CourseCard from '@/components/ui/CourseCard';
import type { PaginationProps } from 'antd';

import { locationOptions } from '@/constants/global';
import {
  SearchOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { useDebounced } from '@/redux/hooks';
import { useCoursesQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import RelatedCourse from '@/components/ui/RelatedCourse';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
type IDProps = {
  params: any;
};
const SearchField = () => {
  const query: Record<string, any> = {};

  const searchParams = useSearchParams();
  const searchParms = searchParams.get('searchTerm');
  const [value, setValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    searchParms || undefined
  );
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);

  query['location'] = location;
  query['minPrice'] = minPrice;
  query['maxPrice'] = maxPrice;
  query['searchTerm'] = searchTerm;

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  //PAGINATION
  const onPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
  };

  // SEARCHING

  //   console.log('value', value);
  //   console.log('max', maxPrice);
  //   console.log('min', minPrice);

  const onChange = (e: RadioChangeEvent) => {
    setLocation(e.target.value);
    setValue(e.target.value);
  };

  const resetFilters = async () => {
    setLocation(undefined);
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setValue('');
    setSearchTerm('');
  };

  const maxValueHandler = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    if (e.target.value === '') {
      setMaxPrice(undefined);
      //   console.log(e.target.value);
    } else {
      setMaxPrice(e.target.value);
    }
    console.log(e.target.value);
  };

  const { data } = useCoursesQuery({ ...query });
  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];

  return (
    <div className='container mt-8 md:mt-16 '>
      <div className='md:grid md:grid-cols-4 gap-6 space-y-4'>
        <div className='space-y-4'>
          <div className='relative'></div>
          <Radio.Group
            onChange={onChange}
            value={value}
            className=' flex flex-col gap-2'
          >
            {locationOptions.map((location, index) => (
              <Radio key={index} value={location.value}>
                {location.label}
              </Radio>
            ))}
          </Radio.Group>

          <div className='flex justify-between items-center w-full space-x-1 pb-1'>
            <Input
              name='minPrice'
              size='small'
              type='number'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              name='maxPrice'
              size='small'
              type='number'
              placeholder='Max Price'
              value={maxPrice}
              onChange={maxValueHandler}
            />

            <Link href={`/`}></Link>
          </div>
          <Button onClick={resetFilters}>Reset</Button>
        </div>
        <div className='col-span-3'>
          {coursesData?.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
              {coursesData?.map((course: ICourse) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <Empty description='No courses found' />
          )}

          <div className='flex justify-end pt-12 '>
            <Pagination
              defaultCurrent={page}
              onChange={onPageChange}
              defaultPageSize={size}
              showSizeChanger={false}
              total={data?.meta?.total}
              showQuickJumper
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
