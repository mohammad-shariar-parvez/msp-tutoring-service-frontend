// 'use client';
import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/Sidebar';
import { ConfigProvider, Layout } from 'antd';
import { getServerSession } from 'next-auth';

import { authOptions } from '../lib/AuthOptions';
import Header from '@/components/ui/Header';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);

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
      <Layout hasSider className=' text-xl'>
        <SideBar session={session} />
        <Header role={session?.role} />
        <Contents>{children}</Contents>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
