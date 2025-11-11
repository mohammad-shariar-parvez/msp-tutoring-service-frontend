import React, { useState } from 'react';
import Form from '../Forms/Form';
import FormTextArea from '../Forms/FormTextArea';
import { Button, Rate, message } from 'antd';
import { useAddReviewMutation } from '@/redux/api/reviewApi';
import { getUserInfo } from '@/services/auth.service';
import { useBookingByCourseIdQuery } from '@/redux/api/bookingApi';

interface RatingReviewProps {
  courseId: string;
}

const RatingReview: React.FC<RatingReviewProps> = ({ courseId }) => {
  const [value, setValue] = useState(3);
  const [addReview] = useAddReviewMutation();
  const { userId } = getUserInfo() as any;
  const reviewOnSubmit = async (values: any) => {
    const finalValue = { ...values, rating: value, courseId, userId };

    message.loading('Updating...');
    try {
      const res = await addReview(finalValue);
      if (!!res) {
        message.success('Profile updated successfully!');
      }
    } catch (err: any) {
      // console.error(err.message);
    }
  };
  // console.log(courseId);

  const { data } = useBookingByCourseIdQuery(courseId);
  //@ts-ignore
  const courseBookingData = data?.courseBooking?.data?.id;
  console.log("9999999999999",courseBookingData);

  return (
    <div className={`py-8  `}>
      <Form submitHandler={reviewOnSubmit}>
        <FormTextArea name='review' rows={4} />
        <div className='flex justify-between items-center space-y-3 '>
          <Button
            htmlType='submit'
            disabled={!courseBookingData && true}
            className=' bg-button-primary  text-white   px-3 mt-8  rounded-md   '
          >
            {!courseBookingData ? 'Pay First to Review' : 'Send Review'}
          </Button>

          <div>
            <Rate
              disabled={!courseBookingData && true}
              onChange={setValue}
              value={value}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RatingReview;
