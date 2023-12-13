'use client';
import { Button, ConfigProvider, Divider, Input, Row, Select } from 'antd';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { FaLocationDot, FaBook } from 'react-icons/fa6';
import { IoIosSchool } from 'react-icons/io';
import { IoSchool } from 'react-icons/io5';
import heroImage from '../../assets/hero.webp';
import { useCoursesQuery } from '@/redux/api/courseApi';
import Link from 'next/link';
import { locationOptions } from '@/constants/global';

import { SubmitHandler } from 'react-hook-form';
import Form from '../Forms/Form';
import LocationSelector from '../Forms/LocationSelector';
import SearchInput from '../Forms/SearchInput';
import { useRouter } from 'next/navigation';
import FormSelectField from '../Forms/FormSelectField';
import { SelectOptions } from '@/types';
import { useCategoriesQuery } from '@/redux/api/category';
import { getCategoryOptions } from '@/utils/cateoryUtils';
const Banner = () => {
  const query: Record<string, any> = { limit: 0 };
  const [course, setCourse] = useState<string>('');
  const router = useRouter();
  const [location, setLocation] = useState<string>('');
  // console.log(location);

  // const { control } = useFormContext();
  const { data, isLoading } = useCoursesQuery({ ...query });
  const { data: categoryData } = useCategoriesQuery({ limit: 100 });
  console.log(categoryData);
  const categoryOptions = getCategoryOptions(categoryData?.categories);

  const resetFilters = () => {
    setCourse('');
  };

  type FormValues = {
    location: string;
    course: string;
  };

  const onSubmit: SubmitHandler<FormValues> = (data: any) => {
    // Handle the form data submission
    console.log(data);

    router.push(
      `search?searchTerm=${data.course}&location=${data.location}&categoryId=${data.categoryId}`
    );
    // console.log(data);
  };

  return (
    <div className='main-banner mb-16 md:mb-32 mt-10  '>
      <div className='container'>
        <div className='md:grid md:grid-cols-12 md:gap-12 '>
          <div className='md:col-span-7'>
            <div className='md:mt-[110px]'>
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
              <Form submitHandler={onSubmit}>
                <div className='p-2 flex flex-col md:flex-row justify-between items-center  w-full rounded-lg  search-shadow '>
                  <div className='flex justify-between items-center  w-full '>
                    <div className='font-semibold  leading-3 flex items-center justify-center flex-1'>
                      <span className=' block text-secondary ms-1 '>
                        <FaBook />
                      </span>
                      <SearchInput />
                    </div>

                    <Divider
                      className='px-[0.3px] h-6 bg-gray-300 '
                      type='vertical'
                    />
                    <div className='font-semibold  leading-3 flex items-center justify-center flex-1  relative '>
                      <span className=' block text-secondary '>
                        <FaLocationDot />
                      </span>

                      <FormSelectField
                        name='location'
                        placeholder='Location'
                        options={locationOptions as SelectOptions[]}
                        bordered={false}
                        dropDownAlign={false}
                        suffixIcon={true}
                      />
                    </div>

                    <Divider
                      className='px-[0.4px] h-6 bg-gray-300  '
                      type='vertical'
                    />
                    <div className='font-semibold  leading-3 flex items-center justify-center flex-1 '>
                      <span className=' block text-secondary '>
                        <IoSchool />
                      </span>

                      <FormSelectField
                        name='categoryId'
                        placeholder='Class'
                        options={categoryOptions as SelectOptions[]}
                        bordered={false}
                        dropDownAlign={false}
                        suffixIcon={true}
                      />
                    </div>

                    <div>
                      <button
                        onClick={resetFilters}
                        value='large'
                        className='hidden md:block find-btn '
                        type='submit'
                      >
                        Find Now
                      </button>

                      <Link href={`/search`}>
                        <Button className=' md:hidden bg-[#335880]  text-white font-medium text-base px-3 py-1 rounded-md  cursor-pointer transition duration-700'>
                          <SearchOutlined />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
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
                height={500}
                alt='msp tutoring hero image'
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
