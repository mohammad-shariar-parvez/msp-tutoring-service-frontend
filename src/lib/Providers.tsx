'use client';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './AntdRegistry';
import { SessionProvider } from 'next-auth/react';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { getUserInfo } from '@/services/auth.service';
import { useEffect, useState } from 'react';
import { Row, Space, Spin } from 'antd';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { role } = getUserInfo() as any;

  useEffect(() => {
    if (role === 'user' && pathname.startsWith('/admin')) {
      redirect('/');
    }
    if (role === 'admin' && !pathname.startsWith('/admin')) {
      redirect('/admin');
    }
    if (role === 'super_admin' && !pathname.startsWith('/super_admin')) {
      redirect('/seper_admin');
    }
  }, [pathname, role, router]);

  return (
    <SessionProvider>
      <Provider store={store}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
