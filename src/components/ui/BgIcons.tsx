import Link from 'next/link';
import React from 'react';
import {
  WhatsAppOutlined,
  FacebookFilled,
  YoutubeFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';
const BgIcons = () => {
  return (
    <div className='text-2xl space-x-11  '>
      <Link className='cursor-pointer ' href=''>
        <WhatsAppOutlined className='text-[#FFFFFFB3] hover:text-white ' />
      </Link>
      <Link className='hover:cursor-pointer' href=''>
        <FacebookFilled className='text-[#FFFFFFB3] hover:text-white ' />
      </Link>
      <Link className='hover:cursor-pointer' href=''>
        <YoutubeFilled className='text-[#FFFFFFB3] hover:text-white ' />
      </Link>
      <Link className='hover:cursor-pointer' href=''>
        <TwitterSquareFilled className='text-[#FFFFFFB3] hover:text-white ' />
      </Link>
    </div>
  );
};

export default BgIcons;
