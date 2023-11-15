import React, { useState } from 'react';
import { useReviewsQuery } from '@/redux/api/reviewApi';
import { Pagination, type PaginationProps } from 'antd';
import CommentsCard from './CommentsCard';

interface CommentProps {
  id: string;
}
const CommentsSection: React.FC<CommentProps> = ({ id }) => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [courseId, setCourseId] = useState(id);
  query['limit'] = size;
  query['page'] = page;
  query['courseId'] = courseId;

  const onPageChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };
  const { data } = useReviewsQuery({ ...query });
  const reviewData = data?.reviews;
  console.log('YOOOOOOO');

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
