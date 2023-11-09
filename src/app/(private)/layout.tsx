'use client';

import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { isLoggedIn } from '@/services/auth.service';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const userLoggedIn = isLoggedIn();
  console.log('router', router);
  console.log('pathname', pathname);

  // useEffect(() => {
  //   // console.log(userLoggedIn);
  //   if (!userLoggedIn) {
  //     router.push(`/login?redirect=${pathname}`);
  //     // redirect('/login');
  //   }
  // }, []);
  useLayoutEffect(() => {
    const userLoggedIn = isLoggedIn();
    if (!userLoggedIn) {
      redirect(`/login?redirect=${pathname}`);
    }
  }, []);
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
