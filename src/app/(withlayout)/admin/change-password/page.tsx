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
      message.error(err.message);
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
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>Reset Password</h3>
          <Row>
            <Col xs={24} md={24} lg={6}>
              <div style={{ margin: '5px 0' }}>
                <FormInput
                  name='oldPassword'
                  label='Old password'
                  type='password'
                  size='large'
                  required
                />
              </div>
              <div style={{ margin: '5px 0' }}>
                <FormInput
                  name='newPassword'
                  label='New password'
                  type='password'
                  size='large'
                  required
                />
              </div>
              <Button type='primary' htmlType='submit'>
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
