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
        message.success('User created successfully!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const base = 'user';
  return (
    <>
      <UMBreadCrumb items={[{ label: 'user', link: `/${base}` }]} />

      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(changePasswordSchema)}
      >
        <div
          style={{
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>Reset Password</h3>
          <Row>
            <Col xs={24} md={24} lg={6}>
              <div className='mb-4 space-y-2 md:col-span-1'>
                <label className='font-bold text-base text-[#565656] mb-2'>
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
                <label className='font-bold text-base text-[#565656] mb-2'>
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
                size='large'
                className=' button-primary  block  ms-auto  rounded-md  px-6 '
              >
                Change Password
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default ResetPassPage;
