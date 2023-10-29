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
    ? categories.map((item: { title: string }, index) => {
        const element = {
          key: index.toString(),
          label: item.title,
        };

        // @ts-ignore
        const child = item?.courses?.map((ele, courseIndex) => {
          return {
            key: index.toString() + courseIndex.toString(),
            label: <Link href={`/services/course/${ele.id}`}>{ele.title}</Link>,
          };
        });
        // @ts-ignore
        element['children'] = child;

        return element;
      })
    : [];
  return (
    <>
      <Dropdown menu={{ items }} className='rounded-none hidden md:block p-4 '>
        <a onClick={(e) => e.preventDefault()}>
          <Space className='bg-red text-black font-semibold text-base'>
            Categories
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default NavDropDown;
