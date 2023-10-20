'use client';

import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import TutorField from '@/components/Forms/TutorField';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { locationOptions, serviceStatus } from '@/constants/global';
import { useAddServiceMutation } from '@/redux/api/serviceApi';
import { Button, Col, Row, message } from 'antd';

const CreateServicePage = () => {
  const [addService] = useAddServiceMutation();

  const adminOnSubmit = async (values: any) => {
    // console.log(values);
    const price = parseFloat(values.price);

    const updatedValues = !isNaN(price) && {
      ...values,
      price,
    };

    try {
      const res = await addService(updatedValues);
      if (!!res) {
        message.success('Service created successfully!');
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
          { label: 'services', link: `/${base}/services` },
        ]}
      />
      <h1>Create Service</h1>
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
              <FormInput name='title' label='Title' size='large' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormSelectField
                name='location'
                label='Location'
                options={locationOptions}
              />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput
                name='price'
                label='Price'
                size='large'
                type='number'
              />
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
              <CategoryField name='serviceId' label='Category' />
            </Col>
            <Col span={8} style={{ margin: '10px 0' }}>
              <TutorField name='courseTutorId' label='Tutor' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormSelectField
                name='status'
                label='Status'
                options={serviceStatus}
              />
            </Col>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput
                name='duration'
                label='Duration'
                size='large'
                type='text'
              />
            </Col>
            <Col span={16} style={{ margin: '10px 0' }}>
              <FormTextArea name='description' label='Description' rows={4} />
            </Col>
          </Row>
        </div>

        <Button htmlType='submit'>submit</Button>
      </Form>
    </>
  );
};

export default CreateServicePage;
