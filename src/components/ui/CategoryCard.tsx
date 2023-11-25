import { ICategory } from '@/types';
import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryCardProps {
  category: ICategory;
  details: boolean;
  isLoading?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  details,
  isLoading,
}) => {
  return (
    <>
      <Link href={`/categories/${category?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white  rounded-lg     hover:shadow-blue-200  shadow-md shadow-blue-100  '>
          {isLoading ? (
            <Skeleton.Image
              active={true}
              className='rounded-t-lg w-full h-36 md:h-48  object-fill '
              // style={{ height: 290 }}
            />
          ) : (
            <Image
              src={category?.imageUrl}
              width={200}
              height={200}
              alt='eagle_image'
              className='rounded-t-lg w-full h-36 md:h-48  object-fill  '
            />
          )}
          <Skeleton className='p-4' active={true} loading={isLoading}>
            <div className='p-5'>
              <h1 className=' mb-2  text-sm md:text-lg      text-secondary font-medium '>
                {category.title}
              </h1>

              {!details ? (
                <p className=' text-gray-700'>
                  Total Course: {category.courses.length}
                </p>
              ) : null}
            </div>
          </Skeleton>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
