import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOptions';
const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOptions);
  // console.log('HAMARA LIB', session);
  // const router = useRouter();
  // const pathname = usePathname();
  // const userLoggedIn = isLoggedIn();
  // console.log('router', router);
  // console.log('pathname', pathname);

  // useEffect(() => {
  //   // console.log(userLoggedIn);
  //   if (!userLoggedIn) {
  //     router.push(`/login?redirect=${pathname}`);
  //     // redirect('/login');
  //   }
  // }, []);
  // useLayoutEffect(() => {
  //   const userLoggedIn = isLoggedIn();
  //   if (!userLoggedIn) {
  //     redirect(`/login?redirect=${pathname}`);
  //   }
  // }, []);
  return (
    <div>
      <div className='bg-white'>
        <Navbar session={session?.accessToken ? true : false} />

        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
