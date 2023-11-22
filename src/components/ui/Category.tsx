'use client';
import { useCategoriesQuery } from '@/redux/api/category';
import { ICategory } from '@/types';
import React from 'react';
import CategoryCard from './CategoryCard';

const Category = () => {
  const { data, isLoading } = useCategoriesQuery({ limit: 8 });

  const categoryData = data?.categories;

  return (
    <div className='container mb-32 '>
      <h1 className='sub-title sub-title-style text-center '>Top Categories</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {categoryData?.map((category: ICategory) => (
          <CategoryCard
            key={category.id}
            category={category}
            details
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
