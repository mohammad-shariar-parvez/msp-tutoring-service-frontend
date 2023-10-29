'use client';
import { Button, Col, Divider, Input, Row } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  SearchOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import heroImage from '../../assets/hero.webp';
import { useServicesQuery } from '@/redux/api/serviceApi';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import { useCoursesQuery } from '@/redux/api/courseApi';
import Link from 'next/link';
const Banner = () => {
  const query: Record<string, any> = { limit: 0 };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchTerm2, setSearchTerm2] = useState<string>('');
  const [limit, setLimit] = useState<number>(0);

  query['searchTerm'] = searchTerm;
  query['searchTerm2'] = searchTerm2;
  query['limit'] = limit;

  const publicOnSubmit = async (values: any) => {
    console.log(values);
    setSearchTerm(values.searchTerm);
    setSearchTerm2(values.searchTerm2);
    setLimit(15);
  };

  const { data, isLoading } = useCoursesQuery({ ...query });

  const resetFilters = () => {
    setSearchTerm('');
    setSearchTerm2('');
    setLimit(0);
  };
  return (
    <div className='main-banner '>
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
              <div className='search-box '>
                <Form submitHandler={publicOnSubmit}>
                  <div className='flex justify-between items-center w-full space-x-1'>
                    <FormInput
                      name='searchTerm2'
                      size='large'
                      type='text'
                      placeholder='Course'
                      bordered={false}
                    />

                    {/* <!-- Address Field  --> */}

                    <FormInput
                      name='searchTerm'
                      size='large'
                      type='text'
                      placeholder='Location'
                      bordered={false}
                    />
                    {/* <!-- Find Button  --> */}
                    {!!searchTerm2 || !!searchTerm ? (
                      <Button
                        onClick={resetFilters}
                        type='primary'
                        className='bg-button-primary mx-1'
                      >
                        <ReloadOutlined />
                      </Button>
                    ) : (
                      <>
                        <Button
                          htmlType='submit'
                          className='hidden md:block bg-button-primary  text-white   px-3  rounded-md  '
                        >
                          Find Now
                        </Button>
                        <Button
                          htmlType='submit'
                          className=' md:hidden bg-button-primary  text-white font-medium text-base px-3 py-1 rounded-md  cursor-pointer transition duration-700'
                        >
                          <SearchOutlined />
                        </Button>
                      </>
                    )}
                    {/* <Button
                      htmlType='submit'
                      className='hidden md:block bg-button-primary  text-white   px-3  rounded-md  '
                    >
                      Find Now
                    </Button> */}
                    {/* <Button className='hidden find-btn'>Find Now</Button> */}
                  </div>
                </Form>
              </div>
            </div>
            <div className='  rounded-b-lg p-4 col-span-3  '>
              {data?.courses?.map((item) => (
                <div className='' key={item.id}>
                  <Link href='/'>
                    <div className='flex justify-between items-center bg-red text-slate-600  '>
                      <p>{item.title}</p>
                      <p>
                        {item?.location} <ArrowRightOutlined className='ps-4' />
                      </p>
                    </div>
                    <Divider className=' my-2' />
                  </Link>
                  {/* <hr /> */}
                </div>
              ))}
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
