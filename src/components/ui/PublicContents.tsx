'use client';
import { Layout, Row, Space, Spin } from 'antd';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

const PublicContents = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return (
      <>
        <Navbar />
        <Row
          justify='center'
          style={{
            height: '100vh',
          }}
          className='opacity-50'
        >
          <Space>
            <Spin tip='Loading' size='large'></Spin>
          </Space>
        </Row>
        <Footer />
      </>
    );
  }

  return (
    <Layout className=' body-color'>
      <Navbar />
      {children}
      <Footer />
    </Layout>
  );
};

export default PublicContents;
