import { ICategory } from '@/types';
import React from 'react';

const CategoryCard = ({ category }: ICategory) => {
  console.log('REal categoty is ', category);

  return <div>CategoryCard</div>;
};

export default CategoryCard;
