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
      <Link className='cursor-pointer ' href='/'>
        <WhatsAppOutlined className='text-[#2a2929b3] hover:text-black ' />
      </Link>
      <Link className='hover:cursor-pointer' href='/'>
        <FacebookFilled className='text-[#2a2929b3] hover:text-black ' />
      </Link>
      <Link className='hover:cursor-pointer' href='/'>
        <YoutubeFilled className='text-[#2a2929b3] hover:text-black ' />
      </Link>
      <Link className='hover:cursor-pointer' href='/'>
        <TwitterSquareFilled className='text-[#2a2929b3] hover:text-black ' />
      </Link>
    </div>
  );
};

export default BgIcons;
