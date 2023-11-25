'use client';
import { Button, Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import RatingReview from '@/components/ui/RatingReview';
import CommentsSection from '@/components/ui/CommentsSection';

import BookingFormSection from '@/components/ui/BookingFormSection';
import { usePathname, useRouter } from 'next/navigation';
import { useCourseQuery } from '@/redux/api/courseApi';
import RelatedCourse from '@/components/ui/RelatedCourse';
import { useSession } from 'next-auth/react';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
type IDProps = {
  params: any;
};
const ServiceCourse = ({ params }: IDProps) => {
  const { id } = params;
  const userLoggedIn = isLoggedIn();
  const da = getUserInfo() as any;
  const router = useRouter();

  const { data, isLoading } = useCourseQuery(id);
  // console.log(data);

  const courseData = data;

  return (
    <section className='bg-[#f3f6fd]  py-16'>
      <div className='container  '>
        <div className=' py-8 my-8 bg-white p-4 rounded-md '>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-4 '>
            <div className='md:col-span-2'>
              <Image
                src={data?.courseTutor?.imageUrl}
                width={150}
                height={150}
                alt='eagle_image'
                // className='rounded-full block mx-auto mt-5 '
              />
            </div>

            <div className='md:col-span-8'>
              <h1 className='mb-3   font-semibold text-2xl text-secondary '>
                {courseData?.courseTutor?.firstName}{' '}
                {courseData?.courseTutor?.middleName}{' '}
                {courseData?.courseTutor?.lastName}
              </h1>

              <p className='text-base font-normal text-[#212529]   m-auto space-y-4 text-justify'>
                {courseData?.courseTutor?.bio}
              </p>

              {/* <div className='py-2'>
                  <Button
                    htmlType='submit'
                    className='hidden md:block bg-button-primary  text-white   px-3  rounded-md  '
                  >
                    Contact
                  </Button>
                </div> */}
            </div>

            <div className='md:col-span-2 '>
              <div className=' space-y-4 text-base font-normal text-secondary   text-justify'>
                <div className=' flex justify-between'>
                  <strong>Experience</strong>
                  <p>{courseData?.courseTutor?.experience}</p>
                </div>
                <div className=' flex justify-between items-center'>
                  <strong>Gender</strong>
                  <p>{courseData?.courseTutor?.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Line */}

        <div className='flex justify-start   divide-x text-secondary my-16 px-4 bg-white rounded-md '>
          <div className='  space-x-5 text-lg font-semibold py-4'>
            <span>Article</span>
          </div>
        </div>

        {/*  INFO*/}
        <div className='  divide-y  grid grid-cols-1 md:grid-cols-12 gap-8 gap-y-20 pb-16  '>
          <div className='c md:col-span-7 '>
            <div className='bg-white   p-4 rounded-md'>
              <h1 className='mb-6  mt-3  text-3xl text-secondary   font-medium '>
                Course Information
              </h1>
              <Image
                src={courseData?.imageUrl}
                width={250}
                height={200}
                alt='eagle_image'
                className='  object-fill    '
              />

              <p className='text-gray-500 text-base mt-4'>
                {courseData?.description}
              </p>
            </div>

            <RatingReview courseId={id} />
          </div>
          {/* Stepper */}
          <div className='  md:col-span-5 '>
            {!isLoading ? <BookingFormSection courseId={id} /> : null}
          </div>
        </div>

        <CommentsSection id={id} />

        <RelatedCourse
          categoryId={courseData?.categoryId}
          location={courseData?.location}
        />
        {/* <Footer /> */}
      </div>
    </section>
  );
};

export default ServiceCourse;
