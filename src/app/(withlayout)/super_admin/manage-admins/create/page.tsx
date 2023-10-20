'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddUserMutation } from '@/redux/api/userApi';
import { Button, Col, Row, message } from 'antd';

const CreateUser = () => {
  const [addUser] = useAddUserMutation();

  const adminOnSubmit = async (values: any) => {
    try {
      const res = await addUser({ ...values, ...{ role: 'admin' } });
      if (!!res) {
        message.success('User created successfully!');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const base = 'super_admin';
  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-admins', link: `/${base}/manage-admins` },
        ]}
      />
      <h1>Create Admin</h1>
      <Form submitHandler={adminOnSubmit}>
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>
            Service information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput name='email' label='Email' size='large' />
            </Col>
          </Row>
          <Button htmlType='submit'>submit</Button>
          <div className='flex items-center space-x-3'>
            <p className='py-2 text-red-400'>Admin Default password is: </p>

            <span className='font-bold'>pass123</span>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateUser;
