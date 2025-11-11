import React, { useState } from 'react';
import { useReviewsQuery } from '@/redux/api/reviewApi';
import { Empty, Pagination, type PaginationProps } from 'antd';
import CommentsCard from './CommentsCard';
import { IReview } from '@/types';
import ReviewSkalaton from './scalaton/ReviewSkalaton';

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
  const { data, isLoading, isError } = useReviewsQuery({ ...query });

  const reviewData: IReview[] = (data?.reviews || []) as IReview[];
  // console.log('YOOOOOOO');
  let searchComponent = null;

  if (!isLoading && isError) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full pt-2'>
        <Empty className='  block' description='Something went wrong' />
      </div>
    );
  }
  if (!isError && !isLoading && reviewData?.length <= 0) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full pt-2'>
        <Empty description='No review yet . Comment first ' />
      </div>
    );
  }
  if (isLoading && !isError) {
    searchComponent = Array.from({ length: 4 }).map((_, index) => (
      <ReviewSkalaton key={index} />
    ));
  }

  if (!isError && !isLoading && reviewData?.length > 0) {
    searchComponent = reviewData?.map((review: IReview) => (
      <CommentsCard key={review?.id} review={review} />
    ));
  }
  return (
    <div className=' bg-white mb-8 pb-8 p-4 rounded-md '>
      <h1 className='mb-6  mt-3  text-3xl text-secondary   font-medium  '>
        User Reviews
      </h1>
      {searchComponent}
      <div className='flex justify-end pt-12  '>
        <Pagination
          defaultCurrent={page}
          onChange={onPageChange}
          defaultPageSize={size}
          showSizeChanger={false}
          total={data?.meta?.total ? data?.meta?.total : size}
        />
      </div>
    </div>
  );
};

export default CommentsSection;
