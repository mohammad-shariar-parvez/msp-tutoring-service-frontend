'use client';
import React, { ReactNode, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Empty, Input, Pagination, Radio } from 'antd';
import CourseCard from '@/components/ui/CourseCard';
import type { PaginationProps } from 'antd';
import { locationOptions } from '@/constants/global';
import { useCoursesQuery } from '@/redux/api/courseApi';
import { useSearchParams } from 'next/navigation';
import { ICourse } from '@/types';

import { Router } from 'next/router';
import CourseCardScalaton from '@/components/ui/scalaton/CourseCardScalaton';
import ErrorMessage from '@/components/ui/atoms/Error';
type IDProps = {
  params: any;
};

const SearchField = ({ searchParams }: any) => {
  const { searchTerm, location, categoryId } = searchParams;
  console.log(searchTerm, location, categoryId);

  const query: Record<string, any> = {};

  const [value, setValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');

  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<string | undefined>(undefined);

  query['minPrice'] = minPrice;
  query['maxPrice'] = maxPrice;
  // query['searchTerm'] = searchTermParams;
  // query['categoryId'] = categoryParams;
  // query['location'] = locationParams;
  query['searchTerm'] = searchTerm;
  query['categoryId'] = categoryId;
  query['location'] = location;
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  //PAGINATION
  const onPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
  };

  const resetFilters = async () => {
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setValue('');
  };

  const maxValueHandler = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    if (e.target.value === '') {
      setMaxPrice(undefined);
    } else {
      setMaxPrice(e.target.value);
    }
  };
  console.log(query);

  const { data, isLoading, isError, isFetching } = useCoursesQuery({
    ...query,
  });
  console.log(data?.meta?.total);

  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];
  let searchComponent = null;

  if (!isLoading && isError) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full'>
        <Empty
          className=' text-xl font-semibold block'
          description='Something went wrong'
        />
      </div>
    );
  }

  if (!isError && !isLoading && coursesData?.length <= 0) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full'>
        <Empty
          className=' text-xl font-semibold block'
          description='No courses found'
        />
      </div>
    );
  }

  if (isLoading && !isError) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardScalaton key={index} />
        ))}
      </div>
    );
  }

  if (!isError && !isLoading && coursesData?.length > 0) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
        {coursesData?.map((course: ICourse) => (
          <CourseCard key={course.id} course={course} isLoading={isLoading} />
        ))}
      </div>
    );
  }

  if (!isError && isFetching) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 '>
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardScalaton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='container my-8 md:my-16 '>
      <div className='md:grid md:grid-cols-4 gap-6 space-y-4 md:space-y-0'>
        <div className='space-y-4'>
          <div className='flex justify-between items-center w-full space-x-4 pb-1 '>
            <Input
              name='minPrice'
              size='middle'
              type='number'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              name='maxPrice'
              size='middle'
              type='number'
              placeholder='Max Price'
              value={maxPrice}
              onChange={maxValueHandler}
            />
          </div>
          <Button onClick={resetFilters}>Reset</Button>
        </div>
        <div className='col-span-3 min-h-[calc(100vh-600px)] relative '>
          {searchComponent}

          <div className='flex justify-end pt-12 '>
            {!isError && !isLoading && coursesData?.length > 0 ? (
              <Pagination
                defaultCurrent={page}
                onChange={onPageChange}
                defaultPageSize={size}
                showSizeChanger={false}
                total={data?.meta?.total}
                showQuickJumper
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
