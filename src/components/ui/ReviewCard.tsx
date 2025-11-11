import { IReview } from '@/types';
import { Avatar, Rate } from 'antd';
import Image from 'next/image';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import 'swiper/css';
import 'swiper/css/pagination';

interface ReviewCardProps {
  reviewData: IReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewData }) => {
  return (
    <div className='  py-14   flex flex-col items-center  rounded-lg   space-y-8 bg-[#E8F3FD] p-4 '>
      {/* <Image
        src={'/person_3.jpg.webp'}
        height={99}
        width={99}
        alt='ppublic pic'
        className='rounded-full ring-4 ring-golden  mx-auto '
      /> */}
      {reviewData?.user.profile?.imageUrl ? (
        <Image
          src={reviewData?.user.profile?.imageUrl}
          width={50}
          height={50}
          alt='eagle_image'
          className=''
        />
      ) : (
        <Avatar size={74} icon={<UserOutlined />} />
      )}

      <div className='text-center space-y-2'>
        <h4 className=' text-xl font-bold tracking-tight text-gray-900'>
          {reviewData.user?.profile?.firstName}{' '}
          {reviewData.user?.profile?.lastName}
        </h4>

        <p className=' text-base text-gray-700 font-medium  '>
          {reviewData.review}
        </p>
        <Rate
          allowHalf
          disabled
          defaultValue={reviewData.rating}
          className='text-base   inline-block w-full '
        />
      </div>
    </div>
  );
};

export default ReviewCard;
