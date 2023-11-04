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

      <Form submitHandler={adminOnSubmit}>
        <div
          style={{
            padding: '15px',
            marginBottom: '10px',
          }}
          className='bg-[#e6f3f9]'
        >
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 mt-3'>
            Course information
          </h5>
          <div className='grid  md:grid-cols-3 gap-4'>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Title
              </label>
              <FormInput name='title' size='large' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Location
              </label>
              <FormSelectField name='location' options={locationOptions} />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Price
              </label>
              <FormInput name='price' size='large' type='number' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Image Url
              </label>
              <FormInput name='imageUrl' size='large' type='url' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Category
              </label>
              <CategoryField name='serviceId' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Tutor
              </label>
              <TutorField name='courseTutorId' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Status
              </label>
              <FormSelectField name='status' options={serviceStatus} />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Duration
              </label>
              <FormInput name='duration' size='large' type='text' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-2 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Description
              </label>
              <FormTextArea name='description' rows={4} />
            </div>
          </div>
          <Button
            size='large'
            className=' block bg-[#274279]     text-white    rounded-md  px-6 '
            htmlType='submit'
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateServicePage;
