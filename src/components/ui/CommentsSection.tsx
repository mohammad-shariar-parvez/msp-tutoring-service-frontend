import React, { useState } from 'react';
import { useReviewsQuery } from '@/redux/api/reviewApi';
import { Pagination, type PaginationProps } from 'antd';
import CommentsCard from './CommentsCard';

const CommentsSection = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  query['limit'] = size;
  query['page'] = page;
  const onPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    console.log(pageSize);
    console.log(page);
    // setSize(pageSize);

    setPage(page);
  };
  const { data } = useReviewsQuery({ ...query });
  const reviewData = data?.reviews;

  console.log('review', reviewData);
  return (
    <div className='p-4 bg-white py-8 my-8'>
      <h1 className='text-lg font-semibold mb-6'>User Reviews</h1>
      {reviewData?.map((review) => (
        <CommentsCard key={review?.id} review={review} />
      ))}
      <div className='flex justify-end pt-12 '>
        <Pagination
          defaultCurrent={page}
          onChange={onPageChange}
          defaultPageSize={size}
          showSizeChanger={false}
          total={data?.meta?.total}
        />
      </div>
    </div>
  );
};

export default CommentsSection;
