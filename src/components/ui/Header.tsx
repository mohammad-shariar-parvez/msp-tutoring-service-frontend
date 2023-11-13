'use client';
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from 'antd';
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { getUserInfo, removeUserInfo } from '@/services/auth.service';
import { authKey } from '@/constants/storageKey';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <Button
          className='ps-0 ms-0 font-semibold text-base bg-transparent border-none '
          onClick={() => logOut()}
          type='text'
          danger
        >
          Logout
        </Button>
      ),
    },
  ];
  const { role } = getUserInfo() as any;
  return (
    <AntHeader className='bg-white fixed top-0  w-full left-0 right-0 z-10 pr-3  md:pr-7'>
      <Row
        justify='end'
        align='middle'
        style={{
          height: '100%',
        }}
      >
        {/* <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        /> */}
        <p className='text-base mr-4'>{role}</p>

        <Dropdown menu={{ items }} className='hover:cursor-pointer'>
          <Avatar size='default' shape='square' icon={<UserOutlined />} />
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
