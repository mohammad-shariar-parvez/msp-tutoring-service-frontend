'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Row, message } from 'antd';
import { useRouter } from 'next/navigation';
import { changePasswordSchema } from '@/schemas/changePassword';

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

const ResetPassPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await changePassword(data);
      if (!!res) {
        message.success('Password changed successfully!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const base = 'admin';
  return (
    <>
      <UMBreadCrumb items={[{ label: 'admin', link: `/${base}` }]} />

      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(changePasswordSchema)}
      >
        <div className='bg-[#e6f3f9] px-4 my-2 rounded-lg py-6'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900 mb-4 leading-none'>
            Change Password
          </h5>
          <Row>
            <div className=' md:w-1/3'>
              <div className='mb-4 space-y-2'>
                <label className='font-medium text-base text-[#565656] mb-2'>
                  Old password
                </label>
                <FormInput
                  name='oldPassword'
                  type='password'
                  size='large'
                  required
                />
              </div>

              <div className='mb-4 space-y-2 md:col-span-1'>
                <label className='font-medium text-base text-[#565656] mb-2'>
                  New password
                </label>
                <FormInput
                  name='newPassword'
                  type='password'
                  size='large'
                  required
                />
              </div>

              <Button
                type='primary'
                htmlType='submit'
                size='middle'
                className=' button-primary  block  ms-auto  rounded-md   '
              >
                Change
              </Button>
            </div>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default ResetPassPage;
