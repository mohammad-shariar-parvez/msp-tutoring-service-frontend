'use client';
import React from 'react';
import { DotChartOutlined } from '@ant-design/icons';
import { useBlogQuery } from '@/redux/api/blogApi';
import HTMLReactParser from 'html-react-parser';
import Image from 'next/image';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import { useParams, useSearchParams } from 'next/navigation';

type IDProps = {
  params: any;
};

const BlogDetails = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useBlogQuery(id);
  // console.log(data);

  // console.log(isLoading);

  // Check if data and data.content are defined before using HTMLReactParser
  const parsedContent = data?.content ? HTMLReactParser(data.content) : null;
  return (
    <div className='container  py-12'>
      <div className=' '>
        {isLoading ? (
          <Skeleton.Input className='w-full mb-8' active />
        ) : (
          <h1 className='mb-8'>{data?.title}</h1>
        )}

        <div className='md:flex   items-start md:space-x-4 space-y-4 md:space-y-0'>
          {isLoading ? (
            <Skeleton.Image
              active={true}
              className='h-[290px] w-full md:w-[290px]'
              // style={{ height: 290 }}
            />
          ) : (
            <Image
              src={data?.imageUrl}
              width={500}
              height={290}
              alt='eagle_image'
              className='w-full md:w-auto '
            />
          )}
          <Skeleton loading={isLoading}>
            <div>{parsedContent}</div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
