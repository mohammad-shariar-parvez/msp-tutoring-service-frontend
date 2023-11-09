'use client';

import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
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
