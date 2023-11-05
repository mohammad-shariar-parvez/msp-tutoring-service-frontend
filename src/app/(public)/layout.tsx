'use client';
import Contents from '@/components/ui/Contents';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import SideBar from '@/components/ui/Sidebar';
import { useAppDispatch } from '@/redux/hooks';
import { lStorgeWishList } from '@/redux/wishList/wishListSlice';
import { isLoggedIn } from '@/services/auth.service';
import { getFromLocalStorage } from '@/utils/local-storage';
import { Layout, Row, Space, Spin } from 'antd';

import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const dispatch = useAppDispatch();
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const storedWishList = getFromLocalStorage('wishList');

  // const parsedWishList = storedWishList
  //   ? JSON.parse(storedWishList)
  //   : {
  //       courses: [],
  //       total: 0,
  //     };
  // dispatch(lStorgeWishList(parsedWishList));

  useEffect(() => {
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

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
    <div className='author-main-area'>
      <Navbar />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
