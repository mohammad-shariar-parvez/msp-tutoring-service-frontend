import { Col, Input, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import heroImage from '../../assets/hero.webp';
const Banner = () => {
  return (
    <div className='main-banner'>
      <div className='container'>
        <Row>
          <Col md={24} lg={14} className='column-banner'>
            <div className='bnr-cnt-area'>
              <h1 className='sg-title-txt'>
                <span>Connect</span> with best teachers near you
              </h1>
              <p className='sg-title-sub-tx'>
                Study Ground is a platform for highly dedicated teachers and
                students to fulfill the communication gap between students and
                teachers.
                <a href='https://study-ground.com/join-as'>Connect now!</a>
              </p>
              <div className='search-box'>
                {/* <!-- Subject Field  --> */}
                <div className='autocomplete f-subject'>
                  <i className='fas fa-book'></i>
                  <Input
                    className='form-control'
                    type='text'
                    name='search_sub'
                    id='search_for'
                    placeholder='Subject/ Class'
                    bordered={false}
                  />
                </div>
                {/* <!-- Address Field  --> */}
                <div className='autocomplete f-pin'>
                  <i className='fas fa-map-marker-alt'></i>
                  <Input
                    className='form-control'
                    type='text'
                    name='search_loc'
                    id='search_address'
                    placeholder='Address/Location'
                    bordered={false}
                  />
                </div>
                {/* <!-- Find Button  --> */}
                <div className='f-btn'>
                  <button name='findbtn' className='find-btn' id='find_btn'>
                    <span className='m-none'>Find &nbsp;Now</span>
                    <div className=' desk-none'>
                      <SearchOutlined />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col md={24} lg={10} className='column-banner'>
            <div className='sg-hero-img-cont'>
              <Image
                src={heroImage}
                width={500}
                alt='study ground hero image'
                className='img-fluid'
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;
