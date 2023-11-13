'use client';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { useForgotPasswordMutation } from '@/redux/api/authApi';

import { Button, message } from 'antd';

function ForgotPasswordPage() {
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (values: { id: string }) => {
    try {
      await forgotPassword(values);
      message.success('Reset link has been sent to your email');
    } catch (error) {}
  };
  return (
    <>
      <div
        style={{ margin: '100px 0', display: 'flex', justifyContent: 'center' }}
      >
        <Form submitHandler={onSubmit}>
          <div className='mb-4 space-y-2 '>
            <label className='font-bold text-base text-[#565656] mb-4'>
              Email
            </label>
            <FormInput name='email' placeholder='Enter Your Email' required />
          </div>
          <Button
            htmlType='submit'
            size='large'
            className=' block bg-[#274279] mt-4    text-white    rounded-md  px-6 '
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
