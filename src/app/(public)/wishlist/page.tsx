'use client';
import CourseCard from '@/components/ui/CourseCard';
import { useAppSelector } from '@/redux/hooks';
import { ICourse } from '@/types';
import { Button, Empty, Input, Pagination, Radio } from 'antd';
import { getFromLocalStorage } from '@/utils/local-storage';
import React from 'react';

const WishList = () => {
  const { courses } = useAppSelector((state) => state.wishList);

  return (
    <section className='container '>
      <h1>My wishlist</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {courses?.map((course: ICourse) => (
          <CourseCard isDelete key={course.id} course={course} />
        ))}
      </div>
      {courses.length == 0 ? <Empty description='No courses found' /> : null}
    </section>
  );
};

export default WishList;
