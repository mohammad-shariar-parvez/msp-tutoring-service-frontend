'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Row,
  Col,
  Badge,
  Avatar,
  Button,
  Dropdown,
  Space,
  MenuProps,
  message,
} from 'antd';
import { IoMdHome } from 'react-icons/io';
import { HomeOutlined } from '@ant-design/icons';
import { MdDashboardCustomize, MdMore, MdHomeFilled } from 'react-icons/md';
import { CgMoreVerticalO } from 'react-icons/cg';
import CategorySider from './CategorySider';
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaBlog } from 'react-icons/fa';
import NavDropDown from './NavDropDown';
import { useAppSelector } from '@/redux/hooks';
import { signOut } from 'next-auth/react';
import {
  UserOutlined,
  BellOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Notification from './Notification';
import Topbar from './Topbar';
const Navbar = ({ session, home = false }: Record<string, any>) => {
  // console.log(session);

  const [navbar, setNavbar] = useState(false);
  const [sideBar, setSideBar] = useState(true);

  const { total } = useAppSelector((state) => state.wishList);

  const handleLogout = () => {
    // console.log('handle');

    signOut();
    message.success('Logout Successfully');
    // await router.push('/login');
  };

  const changeBackground = () => {
    if (window.scrollY >= 5) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  if (typeof window != 'undefined') {
    window.addEventListener('scroll', changeBackground);
  }

  const items: MenuProps['items'] = [
    {
      key: '1',

      label: session ? (
        <>
          <button
            onClick={handleLogout}
            className=' font-semibold text-base bg-transparent border-none cursor-pointer text-red-500'
          >
            Logout
          </button>
        </>
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
      <div className='  bg-white pb-14 '>
        <Row>
          <Col xs={24} md={24} lg={24}>
            <CategorySider sidebar={sideBar} />
          </Col>
          <Col xs={24} md={24} lg={24} className=''>
            <div className='fixed w-full left-0 right-0 top-0 z-50 '>
              {!navbar && home ? <Topbar /> : null}
              <div
                className={`  ${
                  !navbar && home ? 'bg-white' : '  bg-[#f9f9f9] shadow-md '
                } relative `}
              >
                <div className=' container  flex justify-between items-center   '>
                  <Link href='/' className=''>
                    <h2 className=' text-secondary font-bold text-2xl'>
                      MSP Tutoring
                    </h2>
                  </Link>

                  <ul className='flex justify-between items-center w-full list-none fixed bottom-0 md:static z-50  left-0 md:w-auto text-center bg-blue-100 md:bg-inherit text-secondary '>
                    <li className=' px-4 pt-2  md:p-4   block  '>
                      <IoMdHome className=' text-secondary  font-semibold text-xl md:hidden' />
                      <Link
                        className='  text-secondary font-medium text-sm md:font-medium md:text-lg block'
                        href='/'
                      >
                        Home
                      </Link>
                    </li>
                    {session ? (
                      <li className='   px-4 pt-2  md:p-4   block '>
                        <MdDashboardCustomize className=' text-secondary  font-semibold text-lg md:hidden' />
                        <Link
                          className='  text-secondary font-medium text-sm block md:font-medium  md:text-lg'
                          href={`/${session?.role}`}
                        >
                          Dashboard
                        </Link>
                      </li>
                    ) : null}

                    <NavDropDown />

                    <li className='  px-4 pt-2  md:p-4  block '>
                      <FaBlog className=' text-secondary  font-semibold text-lg md:hidden' />
                      <Link
                        className=' text-secondary font-medium text-sm block md:font-medium  md:text-lg'
                        href='/blogs'
                      >
                        Blogs
                      </Link>
                    </li>

                    <li
                      onClick={() => setSideBar(!sideBar)}
                      className='text-secondary    px-4 pt-2  md:p-4    block md:hidden '
                    >
                      <CgMoreVerticalO className='text-secondary font-semibold text-lg md:hidden ' />
                      <Link
                        className=' text-secondary  font-medium text-sm block'
                        href=''
                      >
                        More
                      </Link>
                      <span className=' text-secondary  md:font-medium  text-lg'></span>
                    </li>

                    <li className='   p-4 hidden  md:block '>
                      <Link
                        className=' text-secondary md:font-medium  text-lg'
                        href='/about'
                      >
                        About
                      </Link>
                    </li>
                    <li className='    p-4   hidden  md:block  '>
                      <Link
                        className='   text-secondary md:font-medium  text-lg'
                        href='/contact'
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>

                  <div className='flex items-center font-semibold text-base relative    '>
                    {session?.accessToken ? (
                      <Notification />
                    ) : (
                      <Badge
                        size='small'
                        count={0}
                        style={{ padding: '4px 2px', marginRight: '4px' }}
                      >
                        <BellOutlined className=' text-lg cursor-pointerp-1  text-pink-600 cursor-pointer px-2 py-4   ' />
                      </Badge>
                    )}

                    <Link href='/wishlist' className='px-2 py-4   '>
                      <Badge
                        size='small'
                        count={total}
                        style={{ padding: '0px 2px', marginRight: '4px' }}
                      >
                        <HeartOutlined
                          className=' text-lg cursor-pointer    
                           text-pink-600'
                        />
                      </Badge>
                    </Link>

                    <Dropdown
                      menu={{ items }}
                      arrow={{ pointAtCenter: true }}
                      placement='bottomRight'
                      className='rounded-none ps-2 py-4 md:py-4 md:ps-2'
                    >
                      <UserOutlined className='cursor-pointer ' />
                    </Dropdown>
                  </div>
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
