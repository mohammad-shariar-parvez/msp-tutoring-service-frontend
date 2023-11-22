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
    <CountUp className='statistics-details' end={value} separator=','>
      {({ countUpRef, start }) => (
        <div className='ml-[5px]'>
          <span
            className='text-[26px] font-bold text-[#333]'
            ref={countUpRef}
          />
          <span className='text-[26px] font-bold text-[#333]'>+</span>
          <p className='mb-0  text-base text-[#333] font-medium'>{title}</p>
        </div>
      )}
    </CountUp>
  );

  return (
    <section>
      <div className='bg-[#f8fbff] '>
        <div className='container  '>
          <Row>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <UsergroupDeleteOutlined className=' icon-size clr-01' />
                {formatter(30, 'Active Tutors')}
              </div>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <UserOutlined className=' icon-size clr-02' />
                {formatter(900, 'Active Students')}
              </div>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <BookFilled className=' icon-size clr-03' />
                {formatter(900, 'Subject')}
              </div>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <i className='fas fa-map-marked-alt fa-fw clr-04'></i>
                <CarryOutFilled className=' icon-size clr-04' />
                {formatter(20, 'Locations Cover')}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default BannerInfo;
