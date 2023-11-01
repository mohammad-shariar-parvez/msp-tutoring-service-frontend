import { IReview } from '@/types';
import { Avatar } from 'antd';
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
    <div className='  pb-14   flex flex-col items-center py-4    space-y-8 rounded-2xl  '>
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
          width={40}
          height={40}
          alt='eagle_image'
          className=''
        />
      ) : (
        <Avatar size={64} icon={<UserOutlined />} />
      )}

      <div className='text-center space-y-2'>
        <h4 className=' text-xl font-bold tracking-tight text-gray-900'>
          {reviewData.user?.profile?.firstName}{' '}
          {reviewData.user?.profile?.lastName}
        </h4>

        <p className=' text-base text-gray-700 font-medium  '>
          {reviewData.review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
