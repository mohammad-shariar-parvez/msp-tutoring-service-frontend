// 'use client';
import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/Sidebar';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { ConfigProvider, Layout, Row, Space, Spin } from 'antd';
import { getServerSession } from 'next-auth';
import { useRouter, usePathname, redirect } from 'next/navigation';

// import { useEffect, useState, useCallback } from 'react';
import { authOptions } from '../lib/AuthOptions';
import Header from '@/components/ui/Header';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const session: any = await getServerSession(authOptions);
  // console.log('yo');

  // useEffect(() => {
  //   setIsLoading(true);
  // }, []);

  // if (!isLoading) {
  //   return (
  //     <Row
  //       justify='center'
  //       align='middle'
  //       style={{
  //         height: '100vh',
  //       }}
  //     >
  //       <Space>
  //         <Spin tip='Loading' size='large'></Spin>
  //       </Space>
  //     </Row>
  //   );
  // }

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
        <SideBar session={session} />
        <Header role={session?.role} />
        <Contents>{children}</Contents>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
