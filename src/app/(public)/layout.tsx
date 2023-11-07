'use client';
import Contents from '@/components/ui/Contents';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import PublicContents from '@/components/ui/PublicContents';
import SideBar from '@/components/ui/Sidebar';
import { useAppDispatch } from '@/redux/hooks';
import { lStorgeWishList } from '@/redux/wishList/wishListSlice';
import { isLoggedIn } from '@/services/auth.service';
import { getFromLocalStorage } from '@/utils/local-storage';
import { Layout, Row, Space, Spin } from 'antd';

import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='main-area'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
