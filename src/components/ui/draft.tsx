'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { HomeOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';
import { Input, Row, Col, Badge, Avatar } from 'antd';

import { useDebounced } from '@/redux/hooks';

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

  return (
    <div>
    <div className= ' bg-slate-300 my-0 py-0 ' >
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

    < Col className = '' xs = { 24} md = { 24} lg = { 24} >
      <div className='flex items-center justify-between ' >
        <h1>MSP Tutoring < /h1>
          < div className = '  bg-green-600 md:text-center menu-bar   ' >
            <ul className='inline-flex items-center justify-center list-none text-white  ' >
              <li className=' p-4 mb-4  hidden md:block md:w-28  bg-blue-500   ' >
                <Link href='/' className = 'text-white  ' >
                  About
                  < /Link>
                  < Drop
                  < /li>

                  < li className = ' hidden md:block  md:w-28 p-4  md:hover:bg-green-900' >
                    <Link className='text-white' href = '/' >
                      Dashboard
                      < /Link>
                      < /li>
                      < li className = ' hidden md:block  md:w-28 p-4  md:hover:bg-green-900' >
                        <Link className='text-white' href = '/' >
                          All Services
                            < /Link>
                            < /li>
                            < /ul>
                            < /div>
                            < div >
                            <Badge count={ 25; } />
                              < Badge count = { 25} />
                                <button>Login < /button>
                                < /div>
                                < /div>
                                < /Col>
                                < Col xs = { 24} md = { 24} lg = { 24} >
                                  <CategorySider />
                                  < /Col>
                                  < /Row>
                                  < /div>
                                  < /div>
  );
};

export default Navbar;
