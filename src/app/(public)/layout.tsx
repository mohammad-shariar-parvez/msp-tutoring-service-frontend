'use client';

import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Row, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    <div>
      <div className='bg-white'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
