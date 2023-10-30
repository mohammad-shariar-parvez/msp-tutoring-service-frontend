'use client';
import { IService } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addCourseWishList,
  removeCourseWishList,
} from '@/redux/wishList/wishListSlice';

interface CourseCardProps {
  course: IService;
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
    console.log('removed');
    dispatch(removeCourseWishList(course));
  };

  useEffect(() => {
    // Perform the state update inside the useEffect hook
    const doesExist = courseData.some(
      (itemCourse) => itemCourse.id === course.id
    );
    setIsWishList(doesExist);
  }, [course.id, courseData]);

  return (
    <div className='relative'>
      <Link href={`/course/${course?.id}`} className='no-underline '>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl  '>
          <Image
            src={course.imageUrl}
            width={200}
            height={200}
            alt='eagle_image'
            className='rounded-t-lg w-full h-36 md:h-48  object-fill '
          />
          <div className='p-3 md:p-5 text-black relative'>
            <h5 className='mb-2  text-sm md:text-xl font-bold tracking-tight  '>
              {course.title}
            </h5>

            <div className='flex justify-between items-center  '>
              <p>{course.location}</p>
            </div>

            {/* <p className='font-semibold'>
          Total Course: {category.courses.length}
        </p> */}

            {!!isDelete ? (
              <button>
                <DeleteOutlined
                  onClick={removeWishList}
                  className='absolute cursor-pointer  right-4  bottom-[90px] p-1 text-red-500 '
                />
              </button>
            ) : (
              <button disabled={isWishList} onClick={handleWishList}>
                <HeartOutlined
                  className={`absolute text-base cursor-pointer  right-4  bottom-[90px] p-1 ${
                    isWishList ? 'text-gray-300' : 'text-pink-600 '
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
