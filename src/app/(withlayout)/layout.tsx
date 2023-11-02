'use client';
import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/Sidebar';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Layout, Row, Space, Spin } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

import { useEffect, useState, useCallback } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();

  const router = useRouter();
  // const role = USER_ROLE.ADMIN;
  const pathname = usePathname();
  console.log('pathnaem', pathname);
  const { role } = getUserInfo() as any;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log('USER IS', router2.query.callbackUrl);

    if (!userLoggedIn) {
      router.push('/login');
    }
    if (role === 'user' && pathname?.startsWith('/admin')) {
      router.push('/');
    }
    if (role === 'admin' && pathname?.startsWith('/user')) {
      router.push('/');
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn, role, pathname]);

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
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
