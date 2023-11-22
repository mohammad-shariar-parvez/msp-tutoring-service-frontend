import { IBlogs, ICategory } from '@/types';
import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlogCardProps {
  blog: IBlogs;
  isLoading?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, isLoading }) => {
  return (
    <>
      <Link href={`/blogs/${blog?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white  rounded-lg     hover:shadow-blue-200  shadow-lg shadow-blue-100  '>
          {isLoading ? (
            <Skeleton.Image
              active={true}
              className='rounded-t-lg w-full h-36 md:h-48  object-cover object-center '
              // style={{ height: 290 }}
            />
          ) : (
            <Image
              src={blog?.imageUrl}
              width={200}
              height={200}
              alt='eagle_image'
              className='rounded-t-lg w-full h-36 md:h-48  object-cover object-center '
            />
          )}
          <Skeleton className='p-4' active={true} loading={isLoading}>
            <div className='p-5'>
              <h5 className=' mb-2  text-sm md:text-lg font-semibold text-gray-800 '>
                {blog.title}
              </h5>
            </div>
          </Skeleton>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
