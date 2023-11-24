'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Skeleton } from 'antd';

interface CourseCardProps {}

const CourseCardScalaton: React.FC<CourseCardProps> = ({}) => {
  return (
    <div className='relative'>
      <Link href={`/course/`} className='no-underline '>
        <div className='max-w-sm bg-white  rounded-lg     hover:shadow-blue-200  shadow-md shadow-blue-100  '>
          <Skeleton.Image
            active={true}
            className='rounded-t-lg w-full h-36 md:h-48  object-fill '
          />

          <Skeleton className='p-4' active={true} loading={true}>
            <div className='p-3 md:p-5 text-black relative     '></div>
          </Skeleton>
        </div>
      </Link>
    </div>
  );
};

export default CourseCardScalaton;
