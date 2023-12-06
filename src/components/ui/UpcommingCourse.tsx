'use client';
import { useCategoriesQuery } from '@/redux/api/category';

import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import { useCoursesQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import CourseCard from './CourseCard';
import { FaLocationDot } from 'react-icons/fa6';
import { Divider, Empty } from 'antd';
import CourseCardScalaton from './scalaton/CourseCardScalaton';

const UpcommingCourse = () => {
  const [location, setLocation] = useState('Natore');
  const [active, setActive] = useState(true);
  const { data, isLoading, isError } = useCoursesQuery({
    limit: 4,
    location,
    status: 'UPCOMMING',
  });

  // console.log(courseData);
  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];
  // console.log(data);
  let searchComponent = null;

  if (!isLoading && isError) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full'>
        <Empty className=' block' description='Something went wrong' />
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
      <div className='space-x-2 text-sm md:text-lg '>
        <button
          className={` ${
            active
              ? 'bg-secondary text-white rounded-t-lg hover:bg-primary '
              : 'bg-white text-secondary rounded-t-lg hover:bg-slate-100 '
          }  px-4 py-2   cursor-pointer border-solid border '`}
          onClick={() => {
            setLocation('Natore'), setActive(true);
          }}
        >
          <div className=' space-x-1 leading-3 flex items-center justify-center '>
            <span className=' inline-block '>
              <FaLocationDot />
            </span>
            <span className='inline-block'>Natore</span>
          </div>
        </button>

        <button
          className={` ${
            !active
              ? 'bg-secondary text-white hover:bg-primary'
              : 'bg-white text-secondary hover:bg-slate-100'
          }  px-4 py-2   cursor-pointer rounded-t-lg border-solid border border-gray-200'`}
          onClick={() => {
            setLocation('Gazipur'), setActive(false);
          }}
        >
          <div className=' space-x-1 leading-3 flex items-center justify-center '>
            <span className=' inline-block '>
              <FaLocationDot />
            </span>
            <span className='inline-block'>Gazipur</span>
          </div>
        </button>
      </div>
      <Divider className='my-4'></Divider>
      {searchComponent}
    </div>
  );
};

export default UpcommingCourse;
