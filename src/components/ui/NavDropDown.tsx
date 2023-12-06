import React from 'react';
import { Dropdown, Space } from 'antd';
import { ICategory } from '@/types';
import type { MenuProps } from 'antd';
import { useCategoriesQuery } from '@/redux/api/category';
import Link from 'next/link';
const NavDropDown = () => {
  const { data: categoriesData } = useCategoriesQuery({});

  const categories: ICategory[] = (categoriesData?.categories ||
    []) as ICategory[];

  const items: MenuProps['items'] = categories
    ? categories.map((category: { title: string; id: string }, index) => {
        const element = {
          key: index.toString(),
          label: (
            <span className=' text-secondary font-medium  text-base'>
              <Link
                href={`/categories/${category?.id}`}
                className='no-underline text-secondary font-medium   text-sm '
              >
                {category.title}
              </Link>
            </span>
          ),
        };

        // @ts-ignore
        // const child = item?.courses?.map((ele, courseIndex) => {
        //   return {
        //     key: index.toString() + courseIndex.toString(),
        //     label: (
        //       <Link
        //         className=' text-secondary font-medium  text-base'
        //         href={`/course/${ele.id}`}
        //       >
        //         {ele.title}
        //       </Link>
        //     ),
        //   };
        // });
        // // @ts-ignore
        // element['children'] = child;

        return element;
      })
    : [];
  return (
    <>
      <Dropdown
        placement='bottom'
        menu={{ items }}
        className='rounded-none hidden md:block p-4  '
        overlayStyle={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ul
          onClick={(e) => e.preventDefault()}
          className='bg-transparent border-none'
        >
          <Space className='  text-secondary md:font-medium  text-lg'>
            Categories
          </Space>
        </ul>
      </Dropdown>
    </>
  );
};

export default NavDropDown;
