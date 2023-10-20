'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Button,
  Layout,
  Menu,
  Dropdown,
  Space,
  Input,
  Row,
  Col,
  Divider,
  Typography,
} from 'antd';
import type { MenuProps } from 'antd';
const { Header, Content, Footer } = Layout;
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import { useDebounced } from '@/redux/hooks';
import { useServicesQuery } from '@/redux/api/serviceApi';
import { IService } from '@/types';

const items = [
  {
    key: '1',
    label: <Link href={'/categories/CPU'}>CPU</Link>,
  },
  {
    key: '2',
    label: <Link href={'/categories/Motherboard'}>Motherboard</Link>,
  },
  {
    key: '3',
    label: <Link href={'/categories/RAM'}>RAM</Link>,
  },
  {
    key: '4',
    label: (
      <Link href={'/categories/Power Supply Unit'}>Power Supply Unit</Link>
    ),
  },
  {
    key: '5',
    label: <Link href={'/categories/Storage Device'}>Storage Device</Link>,
  },
  {
    key: '6',
    label: <Link href={'/categories/Monitor'}>Monitor</Link>,
  },
];

const Navbar = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data: servicesData } = useServicesQuery({ ...query });

  const services: IService[] = (servicesData?.services || []) as IService[];

  const items: MenuProps['items'] = services
    ? services.map((item: { title: string }, index) => {
        const element = {
          key: index.toString(),
          label: item.title,
        };
        // @ts-ignore
        const child = item?.course?.map((ele, courseIndex) => {
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

  // console.log('DATA is', items);
  return (
    <div>
      <div style={{ padding: '30px 40px', backgroundColor: '#cdecff' }}>
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
                >
                  MSP
                </Link>
              </h2>
            </Row>
          </Col>

          <Col md={24} lg={16}>
            <Row justify='center'>
              <Space split={<Divider type='vertical' />} align='start'>
                <Typography.Link>Link</Typography.Link>
                <Typography.Link>Link</Typography.Link>
                <Typography.Link>Link</Typography.Link>
                <Typography.Link>Link</Typography.Link>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>Cascading menu</Space>
                  </a>
                </Dropdown>
              </Space>
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
