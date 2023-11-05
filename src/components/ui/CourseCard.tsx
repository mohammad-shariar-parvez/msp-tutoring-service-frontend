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

interface CourseCardProps {
  course: ICourse;
  isDelete?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isDelete = false,
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
    // Perform the state update inside the useEffect hook
    const doesExist = courseData.some(
      (itemCourse) => itemCourse.id === course.id
    );
    setIsWishList(doesExist);

    // Store the current URL in session storage when the component mounts.
  }, [course.id, courseData]);

  return (
    <div className='relative'>
      <Link href={`/course/${course?.id}`} className='no-underline '>
        <div className='max-w-sm bg-white   rounded-lg hover:shadow-blue-200  shadow-lg shadow-blue-100 border-2  '>
          <Image
            src={course.imageUrl}
            width={200}
            height={200}
            alt='eagle_image'
            className='rounded-t-lg w-full h-36 md:h-48  object-fill '
          />
          <div className='p-3 md:p-5  '>
            <h5 className='mb-2  text-sm md:text-lg font-semibold text-gray-800   '>
              {course.title}
            </h5>

            <div className='flex justify-between items-center text-gray-700  '>
              <p>{course.location}</p>
            </div>

            {/* <p className='font-semibold'>
          Total Course: {category.courses.length}
        </p> */}

            {!!isDelete ? (
              <button>
                <DeleteOutlined
                  onClick={removeWishList}
                  className='absolute cursor-pointer  text-lg top-0 right-0 hover:text-red-700  m-2 text-red-500 '
                />
              </button>
            ) : (
              <button disabled={isWishList} onClick={handleWishList}>
                <HeartOutlined
                  className={`absolute text-lg cursor-pointer hover:text-red-700  top-0 right-0 m-2 ${
                    isWishList
                      ? 'text-gray-300 hover:text-gray-300'
                      : 'text-red-500 '
                  } `}
                />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
