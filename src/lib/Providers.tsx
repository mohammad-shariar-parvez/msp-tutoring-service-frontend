'use client';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './AntdRegistry';
import { SessionProvider } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserInfo } from '@/services/auth.service';
import { useEffect } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { role } = getUserInfo() as any;

  // console.log(role);

  useEffect(() => {
    // console.log('USER IS', router2.query.callbackUrl);

    if (role === 'admin') {
      router.push('/admin');
    }
    if (role === 'super_admin') {
      router.push('/');
    }
  }, []);
  return (
    <SessionProvider>
      <Provider store={store}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
