'use client';

import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { sidebarItems } from '@/constants/sidebarItems';

const { Sider } = Layout;

const SideBar = ({ session }: { session: Record<string, string> }) => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = session || { session: { role: null } };
  // console.log('ROOLE SIDEBAR---', session);

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
      <h2
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
        className=' text-secondary font-bold text-2xl   top-0 bg-[#e6f3f9] z-40 my-[16px] text-center '
      >
        MSP
      </h2>
      <Menu
        theme='light'
        defaultSelectedKeys={['1']}
        mode='inline'
        items={sidebarItems(role)}
        style={{
          height: '100vh ',
        }}
        className=' text-sm font-medium text-secondary'
      />
    </Sider>
  );
};

export default SideBar;
