'use client';
import type { MenuProps } from 'antd';
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { USER_ROLE } from './role';
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps['items'] = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];
  const home: MenuProps['items'] = [
    {
      label: <Link href={'/'}>Home</Link>,
      icon: <HomeOutlined />,
      key: `/`,
    },
  ];

  const adminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,

    {
      label: 'Management',
      key: 'management',
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/categories`}>Categories</Link>,
          key: `/${role}/categories`,
        },
        {
          label: <Link href={`/${role}/services`}>Services</Link>,
          key: `/${role}/services`,
        },
        {
          label: <Link href={`/${role}/bookings`}>Bookings</Link>,
          key: `/${role}/bookings`,
        },
        {
          label: <Link href={`/${role}/tutors`}>Tutors</Link>,
          key: `/${role}/tutors`,
        },
      ],
    },
    {
      label: 'Content',
      key: 'content',
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blogs`}>Blogs</Link>,
          key: `/${role}/blogs`,
        },
        {
          label: <Link href={`/${role}/feedbacks`}>Feedbacks</Link>,
          key: `/${role}/feedbacks`,
        },
        {
          label: <Link href={`/${role}/faqs`}>FAQ</Link>,
          key: `/${role}/faqs`,
        },
        {
          label: <Link href={`/${role}/questions`}>Questions</Link>,
          key: `/${role}/questions`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/manage-users`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },

    ...home,
  ];

  const superAdminSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/${role}/manage-admins`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admins`,
    },
    {
      label: <Link href={`/${role}/manage-users`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    ...home,
  ];

  const userSidebarItems: MenuProps['items'] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/bookings`}>Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/bookings`,
    },
    {
      label: <Link href={`/${role}/feedback`}>Feedback</Link>,
      icon: <TableOutlined />,
      key: `/${role}/feedback`,
    },
    ...home,
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
