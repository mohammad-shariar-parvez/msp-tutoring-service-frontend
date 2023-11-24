import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOptions';
import { Rubik } from 'next/font/google';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);

  return (
    // <html lang='en'>
    //   <body className={rubik.className}>
    //     <div className='bg-white'>
    //       <Navbar session={session} />
    //       {children}
    //       <Footer />
    //     </div>
    //   </body>

    <div className='bg-white'>
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
};

export default PublicLayout;
