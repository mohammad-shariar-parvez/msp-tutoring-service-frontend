import { IBlogs, ICategory } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface BlogCardProps {
  blog: IBlogs;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <>
      <Link href={`/blogs/${blog?.id}`} className='no-underline'>
        <div className='max-w-sm bg-white  rounded-lg     hover:shadow-blue-200  shadow-lg shadow-blue-100  '>
          <Image
            src={blog?.imageUrl}
            width={200}
            height={200}
            alt='eagle_image'
            className='rounded-t-lg w-full h-36 md:h-48  object-cover object-center '
          />

          <div className='p-5'>
            <h5 className=' mb-2  text-sm md:text-lg font-semibold text-gray-800 '>
              {blog.title}
            </h5>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
