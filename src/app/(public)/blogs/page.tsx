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
import { IBlogs, ICourse } from '@/types';
import RelatedCourse from '@/components/ui/RelatedCourse';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useBlogsQuery } from '@/redux/api/blogApi';
import CategoryCard from '@/components/ui/CategoryCard';
import BlogCard from '@/components/ui/BlogCard';
type IDProps = {
  params: any;
};
const SearchField = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  query['searchTerm'] = searchTerm;

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  //PAGINATION
  const onPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
  };
  const { data, isLoading } = useBlogsQuery({ ...query });
  // console.log(data);

  const blogsData = data?.blogs;
  return (
    <div className='container mt-8 md:my-16'>
      <div className=' '>
        {blogsData?.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
            {blogsData?.map((blog: IBlogs) => (
              <BlogCard key={blog.id} blog={blog} isLoading={isLoading} />
            ))}
          </div>
        ) : (
          <Empty description='No Blogs found' />
        )}
      </div>
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
  );
};

export default SearchField;
