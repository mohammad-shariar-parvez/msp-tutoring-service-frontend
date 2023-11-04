'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { genderOptions, locationOptions } from '@/constants/global';

import { useAddTutorMutation } from '@/redux/api/tutorApi';
import { Button, Col, Row, message } from 'antd';

const CreateTutor = () => {
  const [addTutor] = useAddTutorMutation();

  const adminOnSubmit = async (values: any) => {
    // console.log(values);

    try {
      const res = await addTutor(values);
      if (!!res) {
        message.success('Tutor created successfully!');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const base = 'admin';
  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'tutors', link: `/${base}/tutors` },
        ]}
      />
      <h1>Create Tutor</h1>
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
            Tutor information
          </p>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput name='firstName' label='First Name' size='large' />
            </Col>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput name='middleName' label='Middle Name' size='large' />
            </Col>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput name='lastName' label='Last Name' size='large' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput
                name='imageUrl'
                label='Image Url'
                size='large'
                type='url'
              />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput name='experience' label='Experience' size='large' />
            </Col>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormSelectField
                size='large'
                name='gender'
                options={genderOptions}
                label='Gender'
                placeholder='Select'
              />
            </Col>
            <Col span={8} style={{ margin: '10px 0' }}>
              <div className='mb-4 space-y-2 md:col-span-1 '>
                <label className='font-bold text-base text-[#565656] mb-2'>
                  Location
                </label>
                <FormSelectField name='location' options={locationOptions} />
              </div>
            </Col>

            <Col span={16} style={{ margin: '10px 0' }}>
              <FormTextArea name='bio' label='Bio' rows={4} />
            </Col>
          </Row>
          <Button htmlType='submit'>Create</Button>
        </div>
      </Form>
    </>
  );
};

export default CreateTutor;
