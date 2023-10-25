'use client';
import { useCategoriesQuery } from '@/redux/api/category';
import { ICategory } from '@/types';
import React from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {
  const { data } = useCategoriesQuery({});
  console.log('category', data);
  const categoryData = data?.categories;

  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        {categoryData?.map((category: ICategory) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow '>
          {/* <a href='#'>
           <img
            class='rounded-t-lg'
            src='/docs/images/blog/image-1.jpg'
            alt=''
          />
        </a> */}
          <div className='p-5'>
            <a href='#'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
            <p className='mb-3 font-normal text-gray-700 '>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
