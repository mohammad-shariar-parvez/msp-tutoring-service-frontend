import { ICategory } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryCardProps {
  category: ICategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // console.log('REal categoty is ', category.courses.length);

  return (
    <>
      <Link href={`/categories/${category?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white border border-gray-400 rounded-lg  shadow-xl  hover:shadow-2xl  '>
          <Image
            src={category?.imageUrl}
            width={200}
            height={200}
            alt='eagle_image'
            className='rounded-t-lg w-full h-36 md:h-48  object-fill  '
          />

          <div className='p-5'>
            <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 '>
              {category.title}
            </h5>

            <p className='font-semibold'>
              Total Course: {category.courses.length}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
