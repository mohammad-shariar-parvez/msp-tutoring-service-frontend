'use client';

import React, { useState } from 'react';
import { Button, Layout, Input, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
import { useDebounced } from '@/redux/hooks';
import { getUserInfo } from '@/services/auth.service';
import CategoryDropdown from './Dropdown';
import Link from 'next/link';

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
      <div className='pt-4 border-b-4 shadow-lg '>
        <Row gutter={[8, 8]}>
          <Col md={0} lg={12}></Col>
          <Col md={0} lg={12}>
            <Row justify='end'>
              <Input
                type='text'
                size='middle'
                placeholder='Search...'
                style={{ width: '40%' }}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </Row>
          </Col>
          <Col md={24} lg={4}>
            <Row justify='space-between'>
              <h2>
                <Link
                  href='/'
                  style={{
                    color: 'white',
                    backgroundColor: '#404040',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    whiteSpace: 'nowrap',
                  }}
                  className='text-lg font-bold'
                >
                  MSP Tutoring
                </Link>
              </h2>
            </Row>
          </Col>

          <Col md={24} lg={16}>
            <Row justify='center'>
              <div className='font-bold text-normal flex list-none text-black'>
                <ul>
                  <Link
                    className='text-base font-bold text-black'
                    href={'/services'}
                  >
                    All Services
                  </Link>
                </ul>

                {!role ?? <Link href={role}>Dashboard</Link>}

                <CategoryDropdown />
              </div>
            </Row>
          </Col>

          <Col md={24} lg={4}>
            <Row justify='end'>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '16px',
                }}
                href='/login'
              >
                <Button
                  style={{
                    marginLeft: '15px',
                  }}
                  type='primary'
                  ghost
                >
                  LOGIN
                </Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
