'use client';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

import React from 'react';

type FormData = {
  email: string | string[] | undefined;
  token: string | string[] | undefined;
};

function ResetPassword({ searchParams }: any) {
  const { email, token } = searchParams;
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  if (!email && !token) return null;

  const defaultValues: {
    email: string | string[] | undefined;
    newPassword: string;
  } = {
    email,
    newPassword: '',
  };
  // console.log('HEllo', token);

  const onSubmit = async (values: FormData) => {
    // console.log(values);

    try {
      const res = await resetPassword({ ...values, token });
      // console.log(res);

      router.push('/login');
    } catch (error) {}
  };

  return (
    <div
      style={{ margin: '100px 0', display: 'flex', justifyContent: 'center' }}
    >
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className='mb-4 space-y-2 '>
          <label className='font-bold text-base text-[#565656] mb-4'>
            Email
          </label>
          <FormInput type='text' name='email' required />
        </div>
        <div className='mb-4 space-y-2 '>
          <label className='font-bold text-base text-[#565656] mb-4'>
            New Password
          </label>
          <FormInput type='password' name='newPassword' required />
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
  );
}

export default ResetPassword;
