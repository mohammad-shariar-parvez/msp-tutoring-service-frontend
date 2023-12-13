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
      if (res && 'data' in res) {
        message.success('Admin created successfully!');
      } else if ('error' in res) {
        message.error('Something went wrong!');
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
      <Form submitHandler={adminOnSubmit}>
        <div className='bg-[#e6f3f9] px-4 my-2 rounded-lg py-6'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900 mb-4 leading-none'>
            Create Admin
          </h5>
          <div className=' md:w-1/3'>
            <div className='mb-4 space-y-2'>
              <label className='font-medium text-base text-[#565656] mb-2'>
                Email
              </label>
              <FormInput
                name='email'
                size='large'
                required
                type='email'
                inputFont='font-normal'
              />
            </div>
          </div>
          <Button className='button-primary mb-2' htmlType='submit'>
            create
          </Button>
          <div className='flex items-center space-x-3'>
            <p className=' text-red-400'>User Default password is: </p>

            <span className='font-medium'>123456</span>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateUser;
