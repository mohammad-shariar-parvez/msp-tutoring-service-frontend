'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Layout, Menu } from 'antd';

import { sidebarItems } from '@/constants/sidebarItems';
import { USER_ROLE } from '@/constants/role';
import { getUserInfo } from '@/services/auth.service';

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;
  // console.log('ROOLE SIDEBAR---', role);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={`h-screen sticky left-0 top-0 bottom-0 z-20 w-44 md:w-64 overflow-auto`}
      // style={{
      //   overflow: 'auto',
      //   height: '100vh',
      //   position: 'sticky',
      //   left: 0,
      //   top: 0,
      //   bottom: 0,
      // }}
    >
      <div
        // style={{
        //   color: 'black',
        //   fontSize: '1.5rem',
        //   textAlign: 'center',
        //   fontWeight: 'bold',
        //   margin: '.5rem',
        //   padding: '10px 0px',
        //   position: 'sticky',
        //   top: '0px',

        // }}
        className='text-black font-bold text-3xl  top-0 bg-[#e6f3f9] z-40 my-[14px] text-center '
      >
        MSP
      </div>
      <Menu
        theme='light'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={sidebarItems(role)}
        style={{
          height: '100vh ',
        }}
      />
    </Sider>
  );
};

export default SideBar;
