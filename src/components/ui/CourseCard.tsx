import { IService } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CourseCardProps {
  course: IService;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  console.log('Real category is', course);

  return (
    <div>
      <Link href={`/categories/${course?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow '>
          <Image
            src={course.imageUrl}
            width={200}
            height={200}
            alt='eagle_image'
            className='rounded-t-lg w-full h-36 md:h-48  object-fill '
          />
          <div className='p-3 md:p-5'>
            <h5 className='mb-2  text-sm md:text-xl font-bold tracking-tight text-gray-900 '>
              {course.title}
            </h5>

            <div className='flex justify-between items-center'>
              <span>{course.location}</span>
            </div>

            {/* <p className='font-semibold'>
          Total Course: {category.courses.length}
        </p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
