'use client';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './AntdRegistry';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
// import socketIO from 'socket.io-client';
import { getBaseUrl } from '@/helpers/config/envConfig';
// const ENDPOINT = getBaseUrl() 'http://localhost:5010/' || '';
const ENDPOINT = getBaseUrl();
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // <SessionProvider>
    //   <Provider store={store}>
    //     <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    //   </Provider>
    // </SessionProvider>
    <SessionProvider>
      <Provider store={store}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
