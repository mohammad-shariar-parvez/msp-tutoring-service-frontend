'use client';
import { Col, Row } from 'antd';
import React from 'react';
import {
  UsergroupDeleteOutlined,
  BookFilled,
  CarryOutFilled,
  UserOutlined,
} from '@ant-design/icons';

const BannerInfo = () => {
  return (
    <section>
      <div className='bg-[#f8fbff] '>
        <div className='container  '>
          <Row>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <UsergroupDeleteOutlined className=' icon-size clr-01' />
                <div className='sg-bnr-info-details'>
                  <h5>5000 +</h5>
                  <p>Active Tutors</p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <UserOutlined className=' icon-size clr-02' />
                <div className='sg-bnr-info-details'>
                  <h5>9000 +</h5>
                  <p>Active Students</p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <BookFilled className=' icon-size clr-03' />
                <div className='sg-bnr-info-details'>
                  <h5>40 +</h5>
                  <p>+Subject</p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <div className='sg-bnr-info-itm'>
                <i className='fas fa-map-marked-alt fa-fw clr-04'></i>
                <CarryOutFilled className=' icon-size clr-04' />

                <div className='sg-bnr-info-details'>
                  <h5>2000 +</h5>
                  <p>Locations Cover</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default BannerInfo;
