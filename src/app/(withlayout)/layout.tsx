'use client';
import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/Sidebar';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { ConfigProvider, Layout, Row, Space, Spin } from 'antd';
import { useRouter, usePathname, redirect } from 'next/navigation';

import { useEffect, useState, useCallback } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log(pathname);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return (
      <Row
        justify='center'
        align='middle'
        style={{
          height: '100vh',
        }}
      >
        <Space>
          <Spin tip='Loading' size='large'></Spin>
        </Space>
      </Row>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            lightTriggerBg: '#ffffff',
            siderBg: '#e6f3f9',
            triggerBg: '#e6f3f9',
            triggerColor: 'black',
          },
        },
      }}
    >
      <Layout hasSider className=' '>
        <SideBar />
        <Contents>{children}</Contents>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
