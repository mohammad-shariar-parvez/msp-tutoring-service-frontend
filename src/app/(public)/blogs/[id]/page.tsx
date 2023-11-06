'use client';
import { useBlogQuery } from '@/redux/api/blogApi';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

type IDProps = {
  params: any;
};

const BlogDetails = ({ params }: IDProps) => {
  const { id } = params;
  const { data } = useBlogQuery(id);
  console.log(data);

  return (
    <div className='container  py-12'>
      <div className=' '>
        <h1 className='mb-8'>{data?.title}</h1>
        <div className='md:flex  justify-between items-start md:space-x-4 space-y-4 md:space-y-0'>
          <div>
            <Image
              src={data?.imageUrl}
              width={500}
              height={290}
              alt='eagle_image'
              className='w-full md:w-auto '
            />
          </div>
          <div>{HTMLReactParser(data.content)}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
