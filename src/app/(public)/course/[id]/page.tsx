'use client';
import { Button, Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import center from '../../../../assets/centre.png';
import Image from 'next/image';
import BasicInfo from '@/components/UserForms/BasicInfo';
import ScheduleDataPicker from '@/components/UserForms/ScheduleDataPicker';
import ScheduleTimePicker from '@/components/UserForms/ScheduleTimePicker';
import StepperForm from '@/components/StepperForm/StepperForm';

import RatingReview from '@/components/ui/RatingReview';
import CommentsSection from '@/components/ui/CommentsSection';
import { useAddBookingMutation } from '@/redux/api/bookingApi';
import BookingFormSection from '@/components/ui/BookingFormSection';
import { usePathname } from 'next/navigation';
import { useCourseQuery } from '@/redux/api/courseApi';

type IDProps = {
  params: any;
};
const ServiceCourse = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useCourseQuery(id);
  const courseData = data;

  return (
    <div className=' '>
      <div className='container  py-12'>
        <div className='bg-white p-4 '>
          <div>
            <Row>
              <Col xs={24} md={24} lg={4}>
                <Image
                  src={center}
                  width={150}
                  height={150}
                  alt='eagle_image'
                  className='rounded-full block mx-auto'
                />
              </Col>

              <Col xs={24} md={24} lg={15}>
                <div className='p-4'>
                  <h1 className='mb-3    text-2xl '>
                    {courseData?.courseTutor?.firstName}{' '}
                    {courseData?.courseTutor?.middleName}{' '}
                    {courseData?.courseTutor?.lastName}
                  </h1>

                  <p className='text-gray-500 text-base'>
                    {courseData?.courseTutor?.bio}
                  </p>

                  <div className='py-2'>
                    <Button
                      htmlType='submit'
                      className='hidden md:block bg-button-primary  text-white   px-3  rounded-md  '
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={24} lg={5} className='p-4'>
                <div>
                  <Row justify='space-between' className='pb-4'>
                    <strong>Experience</strong>
                    <p>{courseData?.courseTutor?.experience}</p>
                  </Row>
                  <Row justify='space-between' className='pb-4'>
                    <strong>Gender</strong>

                    <p>{courseData?.courseTutor?.gender}</p>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Line */}

        <div className='flex justify-start bg-white p-4 my-5 divide-x'>
          <div className='px-4 font-bold text-lg space-x-5 '>
            <span>Information</span>
            <span>Article</span>
          </div>
        </div>
        {/*  INFO*/}
        <div className=' my-5 divide-y '>
          <Row gutter={[17, 17]}>
            <Col xs={24} md={24} lg={14}>
              <div className='bg-white p-4 space-y-4'>
                <h1 className='mb-6  mt-3  text-3xl    '>Course Information</h1>
                <Image
                  src={courseData?.imageUrl}
                  width={200}
                  height={200}
                  alt='eagle_image'
                  className='     '
                />
                <hr />
                <p className='text-gray-500 text-base'>
                  {courseData?.description}
                </p>
              </div>
              {/* Review */}
              <RatingReview courseId={id} />
            </Col>
            {/* Stepper */}
            <Col xs={24} md={24} lg={10}>
              <BookingFormSection courseId={id} />
            </Col>
          </Row>
          {/* Comments */}
          <Row>
            <Col xs={24} md={24} lg={24}>
              <CommentsSection id={id} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ServiceCourse;
