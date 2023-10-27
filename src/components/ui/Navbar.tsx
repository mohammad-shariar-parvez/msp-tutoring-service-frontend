'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { HomeOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';
import { Input, Row, Col, Badge, Avatar, Button } from 'antd';

import { useDebounced } from '@/redux/hooks';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { ICategory } from '@/types';
import { getUserInfo } from '@/services/auth.service';
import { useCategoriesQuery } from '@/redux/api/category';
import CategoryDropdown from './Dropdown';
import CategorySider from './CategorySider';

const Navbar = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sideBar, setSideBar] = useState(true);
  const { role } = getUserInfo() as any;
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  console.log('roel', role);

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
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
    <div>
      <div className='  bg-white pb-16 '>
        <Row>
          {/* <Col md={0} lg={12}></Col>
          <Col md={0} lg={12}>
            <Row justify='end'>
              <Input
                type='text'
                size='middle'
                placeholder='Search...'
                style={{ width: '40%' }}
                // onChange={(e) => {
                //   // setSearchTerm(e.target.value);
                // }}
              />
            </Row>
          </Col> */}

          <Col xs={24} md={24} lg={24}>
            <CategorySider sidebar={sideBar} />
          </Col>
          <Col xs={24} md={24} lg={24} className='bg-white'>
            <div className=' fixed w-full left-0 right-0 z-50 bg-white shadow-sm '>
              <div className=' container  flex justify-between items-center   py-4 md:py-0'>
                <h2>MSP Tutoring</h2>
                <ul className='flex justify-between items-center w-full list-none fixed bottom-0 md:static z-50  left-0 md:w-auto text-center bg-blue-100 md:bg-inherit  '>
                  <li className='   md:w-28 p-4   block text-black '>
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href='/'
                    >
                      Home
                    </Link>
                  </li>
                  <li className='   md:w-28 p-4   block '>
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href='/'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <Dropdown
                    menu={{ items }}
                    className='rounded-none hidden md:block p-4 '
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className='bg-red text-black font-semibold text-base'>
                        Categories
                      </Space>
                    </a>
                  </Dropdown>
                  <li
                    onClick={() => setSideBar(!sideBar)}
                    className='   md:w-28 p-4   block md:hidden'
                  >
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href='/'
                    >
                      Categories
                    </Link>
                  </li>
                </ul>
                <div className='flex items-center space-x-2 font-semibold text-base'>
                  <Badge count={25} />
                  <Badge count={25} />
                  <Button className='font-semibold text-base'>Login</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
