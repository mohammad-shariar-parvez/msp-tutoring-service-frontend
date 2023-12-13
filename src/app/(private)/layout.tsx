import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOptions';
import { Rubik } from 'next/font/google';
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});
const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);

  return (
    <div className={rubik.className}>
      <div className='bg-white'>
        <Navbar session={session} />

        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
