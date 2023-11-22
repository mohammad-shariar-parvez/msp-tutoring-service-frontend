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
  return (
    <Layout className=' body-color'>
      <Navbar />
      {children}
      <Footer />
    </Layout>
  );
};

export default PublicContents;
