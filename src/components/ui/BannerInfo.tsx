'use client';
import { Col, Row } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import {
  UsergroupDeleteOutlined,
  BookFilled,
  CarryOutFilled,
  UserOutlined,
} from '@ant-design/icons';

const BannerInfo = () => {
  const formatter = (value: number, title: string) => (
    <CountUp
      className='statistics-details'
      end={value}
      duration={5}
      separator=','
    >
      {({ countUpRef, start }) => (
        <div className='ml-[5px]'>
          <span
            className='text-2xl font-semibold text-[#333]'
            ref={countUpRef}
          />
          <span className='text-2xl font-semibold text-[#333]'>+</span>
          <p className='mb-0  text-base text-[#333] font-medium'>{title}</p>
        </div>
      )}
    </CountUp>
  );

  return (
    <section>
      <div className='bg-[#f8fbff] '>
        <div className='container py-10 '>
          <div className=' grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8'>
            <div className=' flex items-center justify-center'>
              <UsergroupDeleteOutlined className=' icon-size clr-01' />
              {formatter(30, ' Tutors')}
            </div>

            <div className='flex items-center justify-center'>
              <UserOutlined className=' icon-size clr-02' />
              {formatter(900, ' Students')}
            </div>

            <div className='flex items-center justify-center'>
              <BookFilled className=' icon-size clr-03' />
              {formatter(900, 'Subject')}
            </div>

            <div className='flex items-center justify-center'>
              <i className='fas fa-map-marked-alt fa-fw clr-04'></i>
              <CarryOutFilled className=' icon-size clr-04' />
              {formatter(20, 'Locations ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerInfo;
