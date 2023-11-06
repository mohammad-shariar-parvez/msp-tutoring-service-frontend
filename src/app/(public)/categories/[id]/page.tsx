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
type IDProps = {
  params: any;
};
const Courses = ({ params }: IDProps) => {
  const { id } = params;
  const query: Record<string, any> = {};
  const [value, setValue] = useState('');
  const [formReset, setFormReset] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState(id);
  query['location'] = location;
  query['minPrice'] = minPrice;
  query['maxPrice'] = maxPrice;
  query['categoryId'] = categoryId;
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  //PAGINATION
  const onPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    // console.log(pageSize);
    // console.log(page);
    // setSize(pageSize);

    setPage(page);
  };

  // SEARCHING
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }

  const resetSearchFilters = async () => {
    setSearchTerm('');
  };
  console.log('value', value);

  const onChange = (e: RadioChangeEvent) => {
    setLocation(e.target.value);
    setValue(e.target.value);
  };
  const publicOnSubmit = async (values: any) => {
    setMinPrice(values.minPrice);
    setMaxPrice(values.maxPrice);
  };

  const resetFilters = async () => {
    setFormReset(true);
    setLocation(undefined);
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setCategoryId(id);
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
      <div className='md:grid md:grid-cols-4 gap-6 space-y-4 md:space-y-0'>
        <div className='space-y-4'>
          <div className='relative'>
            <Input
              type='text'
              size='large'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className='pr-8'
            />
            {!!searchTerm && (
              <Button
                onClick={resetSearchFilters}
                type='primary'
                className='m-0 p-0 bg-transparent shadow-none text-gray-600 absolute right-2 bottom-0'
              >
                <CloseOutlined className='text-lg bg-transparent' />
              </Button>
            )}
          </div>
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
            </div>
            <Button onClick={resetFilters}>Reset</Button>
          </div>
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

export default Courses;
