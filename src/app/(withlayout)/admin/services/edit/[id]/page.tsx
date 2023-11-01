'use client';

import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import TutorField from '@/components/Forms/TutorField';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { locationOptions, serviceStatus } from '@/constants/global';
import {
  useServiceQuery,
  useUpdateServiceMutation,
} from '@/redux/api/serviceApi';

import { Button, Col, Row, message } from 'antd';

const EditServicePage = ({ params }: any) => {
  const { data: serviceData, isLoading: loading } = useServiceQuery(params?.id);
  //   console.log(serviceData);
  const [updateService] = useUpdateServiceMutation();

  //@ts-ignore

  const onSubmit = async (values: any) => {
    const price = parseFloat(values.price);

    const updatedValues = !isNaN(price) && {
      ...values,
      price,
    };

    try {
      const res = await updateService({
        id: params?.id,
        body: updatedValues,
      }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success('Service Successfully Updated!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // console.log('VALUE UPDATE', serviceData);
  const defaultValues = {
    title: serviceData?.title || '',
    price: serviceData?.price || '',
    imageUrl: serviceData?.imageUrl || '',
    description: serviceData?.description || '',
    duration: serviceData?.duration || '',
    courseTutorId: serviceData?.courseTutor?.id,
    serviceId: serviceData?.serviceId || '',
    status: serviceData?.status || '',
    location: serviceData?.location || '',
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'admin',
            link: '/admin',
          },
          {
            label: 'services',
            link: '/admin/services',
          },
        ]}
      />

      <>
        <h1>Create Service</h1>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '10px',
            }}
          >
            <p
              style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}
            >
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
    </div>
  );
};

export default EditServicePage;
