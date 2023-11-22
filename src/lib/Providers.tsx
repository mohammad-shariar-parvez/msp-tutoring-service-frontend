'use client';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './AntdRegistry';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import socketIO from 'socket.io-client';
import { getBaseUrl } from '@/helpers/config/envConfig';
// const ENDPOINT = getBaseUrl() 'http://localhost:5010/' || '';
const ENDPOINT = getBaseUrl();
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const { role } = getUserInfo() as any;

  // useLayoutEffect(() => {
  //   // console.log(role);

  //   if (role === 'user' && pathname.startsWith('/admin')) {
  //     redirect('/');
  //   }
  //   if (role === 'admin' && !pathname.startsWith('/admin')) {
  //     redirect('/admin');
  //   }
  //   if (role === 'super_admin' && !pathname.startsWith('/super_admin')) {
  //     redirect('/seper_admin');
  //   }
  // }, [pathname, role, router]);
  useEffect(() => {
    socketId.on('connection', () => {});
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
