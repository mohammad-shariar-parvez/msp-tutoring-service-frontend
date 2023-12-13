'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TbCurrencyTaka } from 'react-icons/tb';
import {
  addCourseWishList,
  removeCourseWishList,
} from '@/redux/wishList/wishListSlice';
import { usePathname } from 'next/navigation';
import { ICourse } from '@/types';
import { Skeleton, Badge, Card, Space, Rate } from 'antd';
import { getRandomRating } from '@/utils/randomRatings';
import { getRandomEnrolledStudents } from '@/utils/randomStudents';

interface CourseCardProps {
  course: ICourse;
  isDelete?: boolean;
  isLoading?: boolean;
  ribbon?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isDelete = false,
  isLoading,
  ribbon,
}) => {
  const { courses: courseData } = useAppSelector((state) => state.wishList);
  const dispatch = useAppDispatch();
  const [isWishList, setIsWishList] = useState(false);
  // console.log(isLoading);

  // console.log('Real category is', courseData.length);

  const handleWishList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addCourseWishList(course));
    setIsWishList(true);
  };

  const removeWishList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(removeCourseWishList(course));
  };

  useEffect(() => {
    const doesExist = courseData.some(
      (itemCourse) => itemCourse.id === course.id
    );
    setIsWishList(doesExist);

    // Store the current URL in session storage when the component mounts.
  }, [course.id, courseData]);

  return (
    <div className='relative'>
      {ribbon ? (
        <Badge.Ribbon
          className={`${ribbon ? 'block' : 'hidden'}`}
          text='Upcomming'
          color='#335880'
        >
          <div className='max-w-sm bg-white  rounded-lg     hover:shadow-blue-200  shadow-md shadow-blue-100  '>
            {isLoading ? (
              <Skeleton.Image
                active={true}
                className='rounded-t-lg w-full h-36 md:h-48  object-fill '
                // style={{ height: 290 }}
              />
            ) : (
              <Image
                src={course.imageUrl}
                width={500}
                height={500}
                alt='eagle_image'
                className='rounded-t-lg w-full h-36 md:h-48   '
              />
            )}

            <Skeleton className='p-4' active={true} loading={isLoading}>
              <div className='p-3 md:p-4 text-secondary relative     '>
                <div className='flex items-center justify-between mb-2  '>
                  <h6 className=' text-sm md:text-lg   text-secondary font-medium '>
                    {course.title}
                  </h6>
                  {!!isDelete ? (
                    <DeleteOutlined
                      onClick={removeWishList}
                      className=' text-red-500  cursor-pointer block hover:text-red-800'
                    />
                  ) : (
                    <HeartOutlined
                      disabled={isWishList}
                      onClick={handleWishList}
                      className={`cursor-pointer block  ${
                        isWishList
                          ? 'text-gray-300  '
                          : 'text-pink-600 hover:text-pink-800   '
                      } `}
                    />
                  )}
                </div>

                <div className='flex justify-between items-center text-xs md:text-base  '>
                  <div className=' space-x-1 leading-3 flex items-center justify-center '>
                    <span className=' inline-block '>
                      <TbCurrencyTaka />
                    </span>
                    <span className='inline-block'>{course.price}</span>
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>
        </Badge.Ribbon>
      ) : (
        <Link href={`/course/${course?.id}`} className='no-underline  '>
          <div className='max-w-sm  rounded-lg     hover:shadow-blue-200  shadow-md shadow-blue-100  '>
            {isLoading ? (
              <Skeleton.Image
                active={true}
                className='rounded-t-lg w-full h-36 md:h-48  object-fill '
              />
            ) : (
              <Image
                src={course.imageUrl}
                width={200}
                height={200}
                alt='eagle_image'
                className='rounded-t-lg w-full h-36 md:h-48   mb-0 pb-0 '
              />
            )}

            <Skeleton className='p-4' active={true} loading={isLoading}>
              <div className='p-3 md:p-4 text-secondary    '>
                <div className='flex items-center justify-between mb-2  '>
                  <h6 className=' text-sm md:text-lg   text-secondary font-medium '>
                    {course.title}
                  </h6>
                  {!!isDelete ? (
                    <DeleteOutlined
                      onClick={removeWishList}
                      className=' text-red-500  cursor-pointer block hover:text-red-800'
                    />
                  ) : (
                    <HeartOutlined
                      disabled={isWishList}
                      onClick={handleWishList}
                      className={`cursor-pointer block  ${
                        isWishList
                          ? 'text-gray-300  '
                          : 'text-pink-600 hover:text-pink-800   '
                      } `}
                    />
                  )}
                </div>

                <div className='flex justify-between items-center text-xs md:text-base mb-1 '>
                  <div className=' space-x-1 leading-3 flex items-center justify-center '>
                    <span className=' inline-block '>
                      <TbCurrencyTaka />
                    </span>
                    <span className='inline-block'>{course.price}</span>
                  </div>
                  <span className='  '>
                    {getRandomEnrolledStudents()} students
                  </span>
                </div>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={getRandomRating()}
                  className='text-base  text-right inline-block w-full '
                />

                {/* <p className='font-semibold'>
          Total Course: {category.courses.length}
        </p> */}

                {/* {!!isDelete ? (
                    <button className='absolute cursor-pointer  right-2  bottom-[90px] p-1 border-none bg-inherit'>
                      <DeleteOutlined
                        onClick={removeWishList}
                        className=' text-red-500 '
                      />
                    </button>
                  ) : (
                    <button
                      className='absolute text-base cursor-pointer  right-1 top-1  bottom-[90px] p-1 border-none bg-inherit'
                      disabled={isWishList}
                      onClick={handleWishList}
                    >
                      <HeartOutlined
                        className={` ${
                          isWishList ? 'text-gray-300' : 'text-pink-600 '
                        } `}
                      />
                    </button>
                  )} */}
              </div>
            </Skeleton>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
