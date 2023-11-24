'use client';
import { useCategoriesQuery } from '@/redux/api/category';

import React from 'react';
import CategoryCard from './CategoryCard';
import { useCoursesQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import CourseCard from './CourseCard';
import { Empty } from 'antd';
import CourseCardScalaton from './scalaton/CourseCardScalaton';

const UpcommingCourse = () => {
  const { data, isLoading, isError } = useCoursesQuery({
    limit: 4,
    status: 'UPCOMMING',
  });

  // console.log(courseData);
  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];
  // console.log(data);
  let searchComponent = null;

  if (!isLoading && isError) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full'>
        <Empty
          className='text-red-500  text-xl font-semibold block'
          description='Something went wrong'
        />
      </div>
    );
  }
  if (!isError && !isLoading && coursesData?.length <= 0) {
    searchComponent = <Empty description='No courses found' />;
  }
  if (isLoading && !isError) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {Array.from({ length: 4 }).map((_, index) => (
          <CourseCardScalaton key={index} />
        ))}
      </div>
    );
  }

  if (!isError && !isLoading && coursesData?.length > 0) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {coursesData?.map((course: ICourse) => (
          <CourseCard
            key={course.id}
            course={course}
            isLoading={isLoading}
            ribbon
          />
        ))}
      </div>
    );
  }

  return (
    <div className='container mb-32 '>
      <h1 className='sub-title sub-title-style text-center   '>
        Upcomming Courses
      </h1>

      {searchComponent}
    </div>
  );
};

export default UpcommingCourse;
