'use client';
import { useCategoriesQuery } from '@/redux/api/category';
import { ICategory } from '@/types';
import { HomeOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { useState } from 'react';

const CategoryDropdown = () => {
  const { data: categoriesData } = useCategoriesQuery({});

  const categories: ICategory[] = (categoriesData?.categories ||
    []) as ICategory[];

  return (
    <ul className='  sub-menu-1 bg-green-600 md:absolute  '>
      <ul className='    ml-4 list-none '>
        {categories.map((items) => (
          <li
            key={items.id}
            className=' amar-2  p-4 m-4   text-left bg-transparent hover-me  '
          >
            <Link className=' block w-full bg-yellow-300' href='/'>
              {items.title}
              <RightOutlined className='float-right' />

              <li className='submenu-2 bg-red-600  '>
                <ul className=' list-none '>
                  {items?.courses?.map((course: any) => (
                    <li
                      key={course.key}
                      className='  p-4    text-left bg-transparent  '
                    >
                      <Link href='/'>{course.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </Link>
          </li>
        ))}
      </ul>
    </ul>
  );
};

export default CategoryDropdown;
