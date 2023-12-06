'use client';
import React, { useState } from 'react';
import { Button, ConfigProvider, Divider, Empty, Tabs } from 'antd';
import { useCoursesQuery } from '@/redux/api/courseApi';
import CourseCard from './CourseCard';
import { ICourse } from '@/types';
import { FaLocationDot } from 'react-icons/fa6';
import { locationOptions } from '@/constants/global';
import CourseCardScalaton from './scalaton/CourseCardScalaton';
import { FaDatabase } from 'react-icons/fa';

const Course: React.FC = () => {
  const [location, setLocation] = useState('Natore');
  const [active, setActive] = useState(true);

  const onChange = (key: string) => {
    setLocation(key);
    console.log(key);
  };

  const { data, isLoading, isError, isFetching } = useCoursesQuery({
    limit: 8,
    location,
    status: 'RUNNING',
  });

  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];
  console.log(data);
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
    searchComponent = <Empty description='No course found' />;
  }
  if (isLoading && !isError) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {Array.from({ length: 8 }).map((_, index) => (
          <CourseCardScalaton key={index} />
        ))}
      </div>
    );
  }

  if (!isError && !isLoading && coursesData?.length > 0) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {coursesData?.map((course: ICourse) => (
          <CourseCard key={course.id} course={course} isLoading={isLoading} />
        ))}
      </div>
    );
  }

  if (!isError && isFetching) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {Array.from({ length: 8 }).map((_, index) => (
          <CourseCardScalaton key={index} />
        ))}
      </div>
    );
  }
  return (
    <section className='container mb-32'>
      <h1 className='sub-title sub-title-style text-center  '>
        Available Courses
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
    </section>
  );
};

export default Course;
