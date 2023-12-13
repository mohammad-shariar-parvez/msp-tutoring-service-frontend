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
    <section className='container pb-32 pt-16'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4  '>
        {courses?.map((course: ICourse) => (
          <CourseCard isDelete key={course.id} course={course} />
        ))}
      </div>
      {courses.length == 0 ? (
        <div className='flex justify-center items-center ]  '>
          <Empty className='block' description='No courses found' />
        </div>
      ) : null}
    </section>
  );
};

export default WishList;
