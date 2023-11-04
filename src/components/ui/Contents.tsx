'use client';
import { Layout } from 'antd';
import Header from './Header';

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content className=' m-2 md:m-8 '>
      <Header />

      <div className='mt-20'>{children}</div>
    </Content>
  );
};

export default Contents;
