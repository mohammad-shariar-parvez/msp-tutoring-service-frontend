import React from 'react';
import { IReview } from '@/types';
import { Avatar, Rate } from 'antd';
import Image from 'next/image';
import { UserOutlined } from '@ant-design/icons';

interface CommentsCardProps {
  review: IReview;
}

const CommentsCard: React.FC<CommentsCardProps> = ({ review }) => {
  return (
    <div className='pb-4 pt-2'>
      <div className='flex  justify-between items-start mb-2 '>
        <div className='flex space-x-2 '>
          {review?.user.profile?.imageUrl ? (
            <Image
              src={review?.user.profile?.imageUrl}
              width={40}
              height={40}
              alt='eagle_image'
              className=''
            />
          ) : (
            <Avatar shape='square' size='default' icon={<UserOutlined />} />
          )}

          <p className=' pb-3 font-medium'>
            {review?.user.profile?.firstName
              ? review?.user.profile?.firstName
              : 'User'}
          </p>
        </div>

        <div>
          <Rate className='text-xs' disabled value={review.rating} />
        </div>
      </div>
      <p className='text-gray-500'>{review?.review}</p>
      {/* <hr className='bg-gray-100 my-4  ' /> */}
    </div>
  );
};

export default CommentsCard;
