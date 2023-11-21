'use client';
import React, { useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import { useCoursesQuery } from '@/redux/api/courseApi';
import CourseCard from './CourseCard';
import { ICourse } from '@/types';
import { FaLocationDot } from 'react-icons/fa6';
import { locationOptions } from '@/constants/global';

const Course: React.FC = () => {
  const [location, setLocation] = useState('natore');
  const onChange = (key: string) => {
    setLocation(key);
    console.log(key);
  };

  const { data } = useCoursesQuery({ limit: 6, location, status: 'RUNNING' });
  const courseData = data?.courses;
  console.log(data);

  return (
    <section className='container mb-32'>
      <h1 className='sub-title sub-title-style text-center  '>
        Available Courses
      </h1>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              fontWeight: '600',
              //   defaultBg: 'red',
              //   primaryColor: 'red',
              /* here is your component tokens */
            },
          },
          token: {
            colorPrimary: 'white',
            colorPrimaryHover: '#3f64ae',
            colorBgContainer: '#274279',
            lineWidth: 2,
          },
        }}
      >
        <Tabs
          onChange={onChange}
          type='card'
          size='large'
          className=''
          items={locationOptions.map((location) => {
            return {
              label: (
                <div className='font-semibold space-x-1 leading-3 flex items-center justify-center '>
                  <span className=' inline-block '>
                    <FaLocationDot />
                  </span>
                  <span className='inline-block'>{location.label}</span>
                </div>
              ),
              key: location.value,
              children: (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                  {courseData?.map((course: ICourse) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ),
            };
          })}
        />
      </ConfigProvider>
    </section>
  );
};

export default Course;
