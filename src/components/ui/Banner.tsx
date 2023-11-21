'use client';
import { Button, Divider, Input, Row } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FaLocationDot, FaBook } from 'react-icons/fa6';
import heroImage from '../../assets/hero.webp';
import { useCoursesQuery } from '@/redux/api/courseApi';
import Link from 'next/link';
const Banner = () => {
  const query: Record<string, any> = { limit: 0 };
  const [course, setCourse] = useState<string>('');

  const publicOnSubmit = async (values: any) => {
    // console.log(values);
    // setSearchTerm(values.searchTerm);
    // setSearchTerm2(values.searchTerm2);
    // setLimit(15);
  };

  const { data, isLoading } = useCoursesQuery({ ...query });
  // console.log(data);

  const resetFilters = () => {
    setCourse('');
  };

  return (
    <div className='main-banner mb-32 mt-10  '>
      <div className='container'>
        <div className='md:grid md:grid-cols-12 md:gap-12 '>
          <div className='md:col-span-7'>
            <div className='mt-[110px]'>
              <h1 className='sg-title-txt'>
                <span className='text-pink-600'>Connect</span> with best
                teachers near you
              </h1>
              <p className='text-base mb-6 font-normal text-gray-500'>
                MSP Tutoring Service is a platform for highly dedicated teachers
                and students to fulfill the communication gap between students
                and teachers.{' '}
                <Link
                  className='no-underline text-blue-500'
                  href='https://msp-tutoring-service.vercel.app/signup'
                >
                  Connect now !
                </Link>
              </p>

              <div className='p-2 flex flex-col md:flex-row justify-between items-center  w-full rounded-lg  search-shadow '>
                <div className='flex justify-between items-center  w-full '>
                  <div className='font-semibold  leading-3 flex items-center justify-center flex-1'>
                    <span className=' block text-gray-500  '>
                      <FaBook />
                    </span>
                    <Input
                      name='course'
                      type='text'
                      placeholder='Course'
                      value={course}
                      bordered={false}
                      onChange={(e) => setCourse(e.target.value)}
                      className='p-1 md:p-3 pl-2 w-full '
                    />
                  </div>
                  <Divider
                    className='px-[0.3px] h-6 bg-gray-300 flex-none'
                    type='vertical'
                  />
                  <div className='font-semibold  leading-3 flex items-center justify-center flex-1'>
                    <span className=' block text-gray-500'>
                      <FaLocationDot />
                    </span>
                    <Input
                      name='location'
                      type='text'
                      placeholder='Location'
                      value={course}
                      bordered={false}
                      onChange={(e) => setCourse(e.target.value)}
                      className=' p-1 md:p-3 pl-2 w-full'
                    />
                  </div>

                  <div>
                    <Link
                      href={{
                        pathname: '/search',
                        query: {
                          searchTerm: course,
                        },
                      }}
                      className='block no-underline  flex-none'
                    >
                      <button
                        onClick={resetFilters}
                        value='large'
                        className='hidden md:block find-btn '
                      >
                        Find Now
                      </button>
                    </Link>
                    <Link href={`/search`}>
                      <Button className=' md:hidden bg-[#335880]  text-white font-medium text-base px-3 py-1 rounded-md  cursor-pointer transition duration-700'>
                        <SearchOutlined />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='  rounded-b-lg p-4 col-span-3  '>
              {data?.courses?.map((item) => (
                <div className='' key={item.id}>
                  <Link href='/'>
                    <div className='flex justify-between items-center bg-red text-slate-600  '>
                      <p>{item.title}</p>
                      <p>
                        {item?.location} <ArrowRightOutlined className='ps-4' />
                      </p>
                    </div>
                    <Divider className=' my-2' />
                  </Link>
                  {/* <hr /> */}
                </div>
              ))}
            </div>
          </div>
          <div className='md:col-span-5 hidden md:block'>
            <div className='mt-[80px]'>
              <Image
                src={heroImage}
                width={500}
                alt='study ground hero image'
                className=' w-full h-auto'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
