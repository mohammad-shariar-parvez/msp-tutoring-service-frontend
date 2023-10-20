'use client';
import { useBookingsQuery } from '@/redux/api/bookingApi';
import { useCategoriesQuery } from '@/redux/api/category';
import { useServicesQuery } from '@/redux/api/serviceApi';
import { useUsersQuery } from '@/redux/api/userApi';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Row, Card, Button } from 'antd';

const ProfilePage = () => {
  // const [addProfile] = useAddProfileMutation();
  const { data: bookings } = useBookingsQuery({});
  const { data: users } = useUsersQuery({ role: 'user' });
  const { data: services } = useServicesQuery({});
  //@ts-ignore
  const { data: categories } = useCategoriesQuery({});

  // useEffect(() => {
  //   addProfile(undefined);
  // }, [addProfile]);

  return (
    <div>
      <div className='container'>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={24} lg={6}>
            <div className='  p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-0 flex space-x-4 justify-between items-center  '>
              <div>
                <ShoppingCartOutlined
                  style={{
                    color: 'green',
                    backgroundColor: 'rgba(0,255,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              </div>
              <div>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Total Bookings
                </p>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  {bookings?.meta?.total}
                </h5>
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={6}>
            <div className='  p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-0 flex justify-between items-center space-x-4 '>
              <div>
                <ShoppingOutlined
                  style={{
                    color: 'blue',
                    backgroundColor: 'rgba(0,0,255,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              </div>
              <div>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Total Services
                </p>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  {services?.meta?.total}
                </h5>
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={6}>
            <div className='  p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-0 flex space-x-4 justify-between items-center  '>
              <div>
                <UserOutlined
                  style={{
                    color: 'red',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              </div>
              <div>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Total Users
                </p>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  {users?.meta?.total}
                </h5>
              </div>
            </div>
          </Col>
          <Col xs={24} md={24} lg={6}>
            <div className='  p-6 bg-white border border-gray-200 rounded-lg shadow hover:border-0 flex space-x-4 justify-between items-center  '>
              <div>
                <DollarCircleOutlined
                  style={{
                    color: 'yellow',
                    backgroundColor: 'rgba(195, 212, 0, 0.25)',
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              </div>
              <div>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  Categories
                </p>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                  {categories?.meta?.total}
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;
