import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Row, Space, Spin } from 'antd';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/AuthOptions';

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log('yoo');
  const session: any = await getServerSession(authOptions);
  // console.log('HAMARA LIB', session);
  // useLayoutEffect(() => {
  //   setIsLoading(true);
  // }, []);

  // if (!isLoading) {
  //   return (
  //     <Row
  //       justify='center'
  //       align='middle'
  //       style={{
  //         height: '100vh',
  //       }}
  //     >
  //       <Space>
  //         <Spin tip='Loading' size='large'></Spin>
  //       </Space>
  //     </Row>
  //   );
  // }
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
