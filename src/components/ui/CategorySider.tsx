import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useCategoriesQuery } from '@/redux/api/category';
import { ICategory } from '@/types';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// submenu keys of first level
interface CategorySiderProps {
  sidebar: boolean;
}
const CategorySider: React.FC<CategorySiderProps> = ({ sidebar }) => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // console.log(latestOpenKey);

    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const { data: categoriesData } = useCategoriesQuery({});

  const categories: ICategory[] = (categoriesData?.categories ||
    []) as ICategory[];

  const rootSubmenuKeys = categories.map((item, index) => index.toString());

  const itemss: MenuProps['items'] = categories
    ? categories.map((item: { title: string }, index) => {
        const element = {
          key: `${item.title}`,
          label: item.title,
        };
        // @ts-ignore
        const child = item?.courses?.map((ele, courseIndex) => {
          return {
            key: `${ele.title}`,
            label: (
              <Link href={`/courses/course/${ele.id}`}> {ele.title} </Link>
            ),
          };
        });

        // @ts-ignore
        element['children'] = child;
        return element;
      })
    : [];
  // console.log(itemss);

  const final = [
    {
      key: '1',
      label: 'Home',
    },
    {
      key: '2',
      label: 'Catogory',
      children: itemss,
    },
    {
      key: '3',
      label: (
        <Link className='' href='/about'>
          About
        </Link>
      ),
    },

    {
      key: '4',
      label: (
        <Link className='' href='/contact'>
          Contact
        </Link>
      ),
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {};
  return (
    <Menu
      mode='inline'
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      style={{ width: 256 }}
      items={final}
      className={`h-screen md:hidden transition-all duration-300 ease-in-out fixed top-6 left-0 overflow-x-hidden  ${
        sidebar
          ? '-translate-x-full'
          : 'translate-x-0 z-50 text-base font-medium'
      }  `}
    />
  );
};

export default CategorySider;
