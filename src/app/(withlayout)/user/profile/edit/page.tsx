'use client';

import Form from '@/components/Forms/Form';

import FormInput from '@/components/Forms/FormInput';

import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';

import {
  useAddProfileMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/api/profile';
import { Button, Col, Row, message } from 'antd';
import { useRouter } from 'next/navigation';

const CreateFacultyPage = () => {
  const router = useRouter();
  const { data } = useProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  const adminOnSubmit = async (values: any) => {
    message.loading('Updating...');
    try {
      const res = await updateProfile({ body: values });
      if (!!res) {
        message.success('Profile updated successfully!');
        router.push('/user/profile');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const defaultValues = {
    firstName: data?.profile?.firstName || '',
    middleName: data?.profile?.middleName || '',
    lastName: data?.profile?.lastName || '',
    useEmail: data?.profile?.useEmail || '',
    profileImage: data?.profile.profileImage || '',
    contactNo: data?.profile?.contactNo || '',
    bio: data?.profile?.bio || '',
  };

  return (
    <>
      <UMBreadCrumb items={[{ label: 'profile', link: `/profile` }]} />
      <Form submitHandler={adminOnSubmit} defaultValues={defaultValues}>
        {/* faculty information */}
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>
            Profile information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={6} style={{ margin: '10px 0' }}>
              <FormInput name='firstName' label='First name' size='large' />
            </Col>

            <Col span={6} style={{ margin: '10px 0' }}>
              <FormInput name='middleName' label='Middle name' size='large' />
            </Col>

            <Col span={6} style={{ margin: '10px 0' }}>
              <FormInput name='lastName' label='Last name' size='large' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput
                type='text'
                name='profileImage'
                label='Profile Image'
                size='large'
              />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput
                type='text'
                name='contactNo'
                label='Contact No'
                size='large'
              />
            </Col>

            <Col span={12} style={{ margin: '10px 0' }}>
              <FormTextArea name='bio' label='Bio' rows={4} />
            </Col>
          </Row>
        </div>

        <Button htmlType='submit'>submit</Button>
      </Form>
    </>
  );
};

export default CreateFacultyPage;
