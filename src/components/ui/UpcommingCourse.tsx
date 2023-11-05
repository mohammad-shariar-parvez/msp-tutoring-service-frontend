'use client';
import { useCategoriesQuery } from '@/redux/api/category';

import React from 'react';
import CategoryCard from './CategoryCard';
import { useCoursesQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import CourseCard from './CourseCard';

const UpcommingCourse = () => {
  const { data } = useCoursesQuery({ limit: 4 });

  const courseData = data?.courses;

  return (
    <div className='container pb-32 '>
      <h1 className='sg-title-txt mb-20 text-center '>Upcomming Courses</h1>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {courseData?.map((course: ICourse) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default UpcommingCourse;
