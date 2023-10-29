import React, { useState } from 'react';
import Form from '../Forms/Form';
import FormTextArea from '../Forms/FormTextArea';
import { Button, Rate, message } from 'antd';
import { useAddReviewMutation } from '@/redux/api/reviewApi';
import { getUserInfo } from '@/services/auth.service';

interface RatingReviewProps {
  courseId: string;
}

const RatingReview: React.FC<RatingReviewProps> = ({ courseId }) => {
  const [value, setValue] = useState(3);
  const [addReview] = useAddReviewMutation();
  const { userId } = getUserInfo() as any;
  const reviewOnSubmit = async (values: any) => {
    const finalValue = { ...values, rating: value, courseId, userId };
    console.log(finalValue);

    message.loading('Updating...');
    try {
      const res = await addReview(finalValue);
      if (!!res) {
        message.success('Profile updated successfully!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div className='py-4 bg-sky-50'>
      <Form submitHandler={reviewOnSubmit}>
        <FormTextArea name='review' rows={4} />
        <div className='flex justify-between items-center space-y-3 '>
          <Button
            htmlType='submit'
            className=' bg-button-primary  text-white   px-3 mt-3  rounded-md  '
          >
            Send Review
          </Button>

          <div>
            <Rate onChange={setValue} value={value} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RatingReview;
