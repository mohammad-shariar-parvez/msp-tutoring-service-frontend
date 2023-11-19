'use client';
import { Layout } from 'antd';

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content className=' m-2 md:m-8 '>
      <div className='mt-20'>{children}</div>
    </Content>
  );
};

export default Contents;
