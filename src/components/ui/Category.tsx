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
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {categoryData?.map((category: ICategory) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Category;
