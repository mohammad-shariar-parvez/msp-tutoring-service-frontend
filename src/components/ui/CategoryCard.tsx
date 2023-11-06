import { ICategory } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryCardProps {
  category: ICategory;
  details: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, details }) => {
  return (
    <>
      <Link href={`/categories/${category?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white  rounded-lg     hover:shadow-blue-200  shadow-lg shadow-blue-100  '>
          <Image
            src={category?.imageUrl}
            width={200}
            height={200}
            alt='eagle_image'
            className='rounded-t-lg w-full h-36 md:h-48  object-fill  '
          />

          <div className='p-5'>
            <h5 className=' mb-2  text-sm md:text-lg font-semibold text-gray-800 '>
              {category.title}
            </h5>

            {!details ? (
              <p className=' text-gray-700'>
                Total Course: {category.courses.length}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
