'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Col, Badge, Avatar, Button } from 'antd';
import { getUserInfo, removeUserInfo } from '@/services/auth.service';
import CategorySider from './CategorySider';
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import NavDropDown from './NavDropDown';
import { useAppSelector } from '@/redux/hooks';
import { useSession } from 'next-auth/react';
import { authKey } from '@/constants/storageKey';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [sideBar, setSideBar] = useState(true);
  const { total } = useAppSelector((state) => state.wishList);
  const [userRole, setUserRole] = useState(null);
  const { data: session, status } = useSession();
  const { role } = getUserInfo() as any;
  console.log('session', role);
  const router = useRouter();
  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, [userRole]);

  const handleLogout = () => {
    removeUserInfo(authKey);
    router.push('/login');
  };

  return (
    <div>
      <div className='  bg-white pb-16 '>
        <Row>
          {/* <Col md={0} lg={12}></Col>
          <Col md={0} lg={12}>
            <Row justify='end'>
              <Input
                type='text'
                size='middle'
                placeholder='Search...'
                style={{ width: '40%' }}
                // onChange={(e) => {
                //   // setSearchTerm(e.target.value);
                // }}
              />
            </Row>
          </Col> */}

          <Col xs={24} md={24} lg={24}>
            <CategorySider sidebar={sideBar} />
          </Col>
          <Col xs={24} md={24} lg={24} className='bg-white'>
            <div className=' fixed w-full left-0 right-0 z-50 bg-white shadow-sm '>
              <div className=' container  flex justify-between items-center   py-4 md:py-1'>
                <h2>MSP Tutoring</h2>
                <ul className='flex justify-between items-center w-full list-none fixed bottom-0 md:static z-50  left-0 md:w-auto text-center bg-blue-100 md:bg-inherit  '>
                  <li className='   md:w-28 p-4   block text-black '>
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href='/'
                    >
                      Home
                    </Link>
                  </li>
                  <li className='   md:w-28 p-4   block '>
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href={`/${role}`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <NavDropDown />
                  <li
                    onClick={() => setSideBar(!sideBar)}
                    className='   md:w-28 p-4   block md:hidden'
                  >
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href='/'
                    >
                      Categories
                    </Link>
                  </li>
                </ul>

                <div className='flex items-center space-x-4 font-semibold text-base'>
                  <Link href='/wishlist'>
                    <Badge size='small' count={total}>
                      <HeartOutlined
                        className=' text-lg cursor-pointer     p-1 
                           text-pink-600'
                      />
                    </Badge>
                  </Link>
                  {userRole ? (
                    <Link href='/login'>
                      <Button className='font-semibold text-base'>
                        Logout
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={handleLogout}
                      className='font-semibold text-base'
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
