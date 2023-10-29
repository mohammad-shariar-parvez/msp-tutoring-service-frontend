'use client';
import { IService } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import { useAppDispatch } from '@/redux/hooks';
import { addCourseWishList } from '@/redux/wishList/wishListSlice';

interface CourseCardProps {
  course: IService;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const dispatch = useAppDispatch();
  const [isWishList, setIsWishList] = useState(false);
  // console.log('Real category is', course);

  const handleWishList = () => {
    dispatch(addCourseWishList(course));
    setIsWishList(true);
  };

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
          <div className='p-3 md:p-5 text-black'>
            <h5 className='mb-2  text-sm md:text-xl font-bold tracking-tight  '>
              {course.title}
            </h5>

            <div className='flex justify-between items-center  '>
              <p>{course.location}</p>
            </div>

            {/* <p className='font-semibold'>
          Total Course: {category.courses.length}
        </p> */}
          </div>
        </div>
      </Link>
      {/* <HeartTwoTone
        onClick={handleWishList}
        disabled={isWishList}
        className={`absolute   right-1 bottom-[73px]  ${
          isWishList ? 'bg-green-300' : ' text-red-500 '
        }  `}
      /> */}
      {isWishList ? (
        <HeartTwoTone
          onClick={handleWishList}
          className='absolute   right-1 bottom-[73px]'
          twoToneColor='#818c91'
        />
      ) : (
        <HeartTwoTone
          onClick={handleWishList}
          className='absolute   right-1 bottom-[73px]'
          twoToneColor='#eb2f96'
        />
      )}
    </div>
  );
};

export default CourseCard;
