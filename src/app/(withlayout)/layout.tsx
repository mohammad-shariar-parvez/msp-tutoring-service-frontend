// withlayouts/layout.tsx
import dynamic from 'next/dynamic';
import Contents from '@/components/ui/Contents';
import SideBar from '@/components/ui/Sidebar';
import { ConfigProvider, Layout } from 'antd';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOptions';
import Header from '@/components/ui/Header';

// Dynamic wrapper to force client-side rendering
const ClientWrapper = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>),
  { ssr: false }
);

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // Fetch session on server
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
      <Layout hasSider className="text-xl">
        <SideBar session={session} />
        <Header session={session} />
        <Contents>
          {/* Everything inside this wrapper is client-only */}
          <ClientWrapper>{children}</ClientWrapper>
        </Contents>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardLayout;
