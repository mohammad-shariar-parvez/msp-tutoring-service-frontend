import { Carousel } from 'antd';
import React from 'react';
import {
  WhatsAppOutlined,
  FacebookFilled,
  YoutubeOutlined,
  TwitterSquareFilled,
  PhoneOutlined,
  FacebookOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaWhatsappSquare, FaFacebookF, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';

const Topbar = () => {
  return (
    <section className='  hidden md:block font-normal text-base bg-[#335880]  backdrop-blur-md text-gray-300 p-4 text-center py-1   '>
      <div className='  flex items-center justify-between container '>
        <div>
          <small>
            <PhoneOutlined /> +880-1842403974
          </small>
        </div>
        <Carousel
          autoplay
          dots={false}
          className='max-w-xs   text-center text-gray-300  '
          autoplaySpeed={1800}
        >
          <div>
            <span>Welcome to MSP Tutoring</span>
          </div>
          <div>
            <span>Tutors Now Available</span>
          </div>
          <div>
            <span>Improve Your Result </span>
          </div>
        </Carousel>
        <div className='text-lg cursor-pointer  space-x-4 text-white leading-3  '>
          <Link className='cursor-pointer inline-block my-auto' href='/'>
            {/* <WhatsAppOutlined className='text-gray-300 hover:text-gray-100' /> */}
            <FaWhatsappSquare className='text-gray-300 hover:text-gray-100 pt-0' />
          </Link>
          <Link className='hover:cursor-pointer' href='/'>
            <FaFacebookF className='text-gray-300 hover:text-gray-100 text-base ' />
          </Link>
          <Link className='hover:cursor-pointer' href='/'>
            <FaYoutube className='text-gray-300 hover:text-gray-100 ' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
