'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addCourseWishList,
  removeCourseWishList,
} from '@/redux/wishList/wishListSlice';
import { usePathname } from 'next/navigation';
import { ICourse } from '@/types';
import { Skeleton, Badge, Card, Space } from 'antd';

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
      <Link href={`/course/${course?.id}`} className='no-underline '>
        {/* <Badge.Ribbon
          className={`${ribbon ? 'block' : 'hidden'}`}
          text='Hippies'
          color='#335880'
        > */}
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
              width={200}
              height={200}
              alt='eagle_image'
              className='rounded-t-lg w-full h-36 md:h-48  object-fill '
            />
          )}

          <Skeleton className='p-4' active={true} loading={isLoading}>
            <div className='p-3 md:p-5 text-black relative     '>
              <h1 className='mb-2  text-sm md:text-lg   text-secondary font-semibold '>
                {course.title}
              </h1>

              <div className='flex justify-between items-center text-xs md:text-base  '>
                <p>{course.location}</p>
              </div>

              {/* <p className='font-semibold'>
          Total Course: {category.courses.length}
        </p> */}

              {!!isDelete ? (
                <button>
                  <DeleteOutlined
                    onClick={removeWishList}
                    className='absolute cursor-pointer  right-2  bottom-[90px] p-1 text-red-500 '
                  />
                </button>
              ) : (
                <button disabled={isWishList} onClick={handleWishList}>
                  <HeartOutlined
                    className={`absolute text-base cursor-pointer  right-2 top-1  bottom-[90px] p-1 ${
                      isWishList ? 'text-gray-300' : 'text-pink-600 '
                    } `}
                  />
                </button>
              )}
            </div>
          </Skeleton>
        </div>
        {/* </Badge.Ribbon> */}
      </Link>
    </div>
  );
};

export default CourseCard;
