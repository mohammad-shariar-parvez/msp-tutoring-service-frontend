'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Badge,
  Avatar,
  Button,
  Dropdown,
  Space,
  MenuProps,
} from 'antd';
import { getUserInfo, removeUserInfo } from '@/services/auth.service';
import CategorySider from './CategorySider';
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import NavDropDown from './NavDropDown';
import { useAppSelector } from '@/redux/hooks';
import { useSession, signOut } from 'next-auth/react';
import { authKey } from '@/constants/storageKey';
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Notification from './Notification';
const Navbar = () => {
  const [sideBar, setSideBar] = useState(true);
  const [navbar, setNavbar] = useState(false);
  const { total } = useAppSelector((state) => state.wishList);
  const [userRole, setUserRole] = useState(null);
  const { data: session, status } = useSession();
  const { role, userId } = getUserInfo() as any;

  const router = useRouter();
  console.log(session, status);

  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, [userRole]);

  const handleLogout = () => {
    console.log('handle');
    removeUserInfo(authKey);
    signOut();
    router.push('/login');
  };

  // const changeBackground = () => {
  //   if (window.scrollY >= 5) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  // if (typeof window != 'undefined') {
  //   window.addEventListener('scroll', changeBackground);
  // }

  const items: MenuProps['items'] = [
    {
      key: '1',

      label: userRole ? (
        <button
          onClick={handleLogout}
          className=' font-semibold text-base bg-transparent border-none cursor-pointer text-red-500'
        >
          Logout
        </button>
      ) : (
        <Link href='/login'>
          <Button className=' ps-0 ms-0 font-semibold text-base border-none bg-transparent'>
            Login
          </Button>
        </Link>
      ),
    },
  ];

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
          <Col xs={24} md={24} lg={24} className=''>
            <div className=' fixed w-full left-0 right-0 z-50 bg-[#f9f9f9] shadow-sm top-0 '>
              <div className=' container  flex justify-between items-center   py-4 md:py-1 '>
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
                  {role ? (
                    <li className='   md:w-28 p-4   block '>
                      <Link
                        className='text-black md:hover:text-slate-400 font-semibold text-base'
                        href={`/${role}`}
                      >
                        Dashboard
                      </Link>
                    </li>
                  ) : null}

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
                  <li className='   md:w-28 p-4   block '>
                    <Link
                      className='text-black md:hover:text-slate-400 font-semibold text-base'
                      href='/blogs'
                    >
                      Blogs
                    </Link>
                  </li>
                </ul>

                <div className='flex items-center space-x-2 font-semibold text-base relative'>
                  {userId ? (
                    <Notification />
                  ) : (
                    <Badge
                      size='small'
                      count={0}
                      style={{ padding: '4px 2px', marginRight: '4px' }}
                    >
                      <BellOutlined className=' text-lg cursor-pointerp-1 mx-0 px-0 text-pink-600' />
                    </Badge>
                  )}

                  <Link href='/wishlist'>
                    <Badge
                      size='small'
                      count={total}
                      style={{ padding: '0px 2px', marginRight: '4px' }}
                    >
                      <HeartOutlined
                        className=' text-lg cursor-pointer     p-1 
                           text-pink-600'
                      />
                    </Badge>
                  </Link>
                  <Dropdown
                    menu={{ items }}
                    arrow={{ pointAtCenter: true }}
                    placement='bottom'
                    overlayClassName={`  mt-12   top-3  rounded-lg z-[200] fixed  `}
                  >
                    {/* <Avatar
                      size='default'
                      shape='square'
                      icon={<UserOutlined />}
                    /> */}
                    <UserOutlined className='cursor-pointer ' />
                  </Dropdown>
                  {/* {userRole ? (
                    <Link href='/login'>
                      <Button
                        onClick={handleLogout}
                        className='font-semibold text-base'
                      >
                        Logout
                      </Button>
                    </Link>
                  ) : (
                    <Link href='/login'>
                      <Button className='font-semibold text-base'>Login</Button>
                    </Link>
                  )} */}
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
