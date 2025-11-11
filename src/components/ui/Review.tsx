// Import Swiper React components
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';
import { useReviewsQuery } from '@/redux/api/reviewApi';

export default function Review() {
  const { data } = useReviewsQuery({ limit: 12 });
  console.log(data);

  const reviewData = data?.reviews;

  return (
    <section className=' py-16 mb-32  text-secondary'>
      <div className=' container text-center    rounded-lg       '>
        <h1 className=' sub-title  text-center '>User Reviews</h1>
        <div className=''>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className='mySwiper cursor-pointer  '
          >
            {reviewData?.map((review) => (
              <SwiperSlide key={review?.id}>
                <ReviewCard reviewData={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
