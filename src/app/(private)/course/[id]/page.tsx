'use client';
import React from 'react';
import Image from 'next/image';
import RatingReview from '@/components/ui/RatingReview';
import CommentsSection from '@/components/ui/CommentsSection';
import HTMLReactParser from 'html-react-parser';
import BookingFormSection from '@/components/ui/BookingFormSection';
import { useCourseQuery } from '@/redux/api/courseApi';
import RelatedCourse from '@/components/ui/RelatedCourse';
import { Skeleton } from 'antd';

type IDProps = {
  params: any;
};
const ServiceCourse = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useCourseQuery(id);
  // console.log(data);

  const courseData = data;

  return (
    <section className='bg-[#f3f6fd]  py-16'>
      <div className='container  '>
        <div className='   bg-white px-4 py-8 rounded-md '>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-8 '>
            <div className='md:col-span-2 space-y-2 '>
              {isLoading ? (
                <Skeleton.Image
                  active={true}
                  className='w-full h-auto  block'
                  // style={{ height: 290 }}
                />
              ) : (
                <Image
                  src={data?.courseTutor?.imageUrl}
                  width={150}
                  height={150}
                  alt='eagle_image'
                  className='w-full h-auto  block rounded-md '
                />
              )}
              <strong className='   block text-secondary '>
                {courseData?.courseTutor?.firstName}{' '}
                {courseData?.courseTutor?.middleName}{' '}
                {courseData?.courseTutor?.lastName}
              </strong>
            </div>

            <div className='md:col-span-7'>
              <Skeleton active={true} loading={isLoading}>
                <p className='text-base font-normal text-[#212529]   m-auto space-y-4 text-justify inline-block align-text-top'>
                  {HTMLReactParser(courseData?.courseTutor?.bio || '')}
                </p>
              </Skeleton>

              {/* <div className='py-2'>
                  <Button
                    htmlType='submit'
                    className='hidden md:block bg-button-primary  text-white   px-3  rounded-md  '
                  >
                    Contact
                  </Button>
                </div> */}
            </div>
            <Skeleton active={true} loading={isLoading} paragraph={{ rows: 3 }}>
              <div className='md:col-span-3 '>
                <div className=' space-y-3 text-base font-normal text-secondary   text-justify'>
                  <div className=' flex justify-between'>
                    <strong>Experience</strong>
                    <p>{courseData?.courseTutor?.experience}</p>
                  </div>
                  <div className=' flex justify-between items-center'>
                    <strong>Gender</strong>
                    <p>{courseData?.courseTutor?.gender}</p>
                  </div>
                  <div className=' flex justify-between items-center'>
                    <strong>Location</strong>
                    <p>{courseData?.courseTutor?.location}</p>
                  </div>
                </div>
              </div>
            </Skeleton>
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
          <div className='c md:col-span-7  '>
            <div className='bg-white   px-4 py-8  rounded-md'>
              <h1 className='mb-6    text-3xl text-secondary   font-medium '>
                Course Information
              </h1>
              {isLoading ? (
                <Skeleton.Image
                  active={true}
                  className='h-[200px] w-[250px]  object-fill mb-10 '
                  // style={{ height: 290 }}
                />
              ) : (
                <Image
                  src={courseData?.imageUrl}
                  width={250}
                  height={200}
                  alt='eagle_image'
                  className='  object-fill rounded-md    '
                />
              )}
              <Skeleton
                active={true}
                loading={isLoading}
                paragraph={{ rows: 10 }}
              >
                <p className='text-gray-500 text-base mt-4 text-justify'>
                  {HTMLReactParser(courseData?.description || '')}
                </p>
              </Skeleton>
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
