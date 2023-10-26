import { ICategory } from '@/types';
import Link from 'next/link';
import React from 'react';

const CategoryCard = ({ category }: ICategory) => {
  console.log('REal categoty is ', category.courses.length);

  return (
    <>
      <Link href={`/categories/${category?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow '>
          {/* <a href='#'>
           <img
            class='rounded-t-lg'
            src='/docs/images/blog/image-1.jpg'
            alt=''
          />
        </a> */}
          <div className='p-5'>
            <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 '>
              {category.title}
            </h5>

            <p className='mb-3 font-normal text-gray-700 '>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <p className='font-semibold'>
              Total Course: {category.courses.length}{' '}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
