import React from 'react';
import StepperForm from '../StepperForm/StepperForm';
import { useAddBookingMutation } from '@/redux/api/bookingApi';
import ScheduleDataPicker from '../UserForms/ScheduleDataPicker';
import ScheduleTimePicker from '../UserForms/ScheduleTimePicker';
import { message } from 'antd';

type BookingFormProps = {
  courseId: string;
};

const BookingFormSection: React.FC<BookingFormProps> = ({ courseId }) => {
  const [addBooking] = useAddBookingMutation();
  const steps = [
    {
      title: 'Start Date',
      content: <ScheduleDataPicker />,
    },
    {
      title: ' Time ',
      content: <ScheduleTimePicker />,
    },
  ];
  const handleBookingSubmit = async (values: any) => {
    try {
      const res = await addBooking({ ...values, courseId });
      if (!!res) {
        message.success('Booking Completed successfully!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
    // console.log('STEPPR', values);
  };
  return (
    <div className='req-demo-form p-4'>
      <h3 className='mb-9 text-green-600 mt-3 text-center text-3xl'>
        Book Your Course
      </h3>

      <StepperForm
        persistKey='user-booking-form'
        submitHandler={(value) => {
          handleBookingSubmit(value);
        }}
        steps={steps}
      />
    </div>
  );
};

export default BookingFormSection;
