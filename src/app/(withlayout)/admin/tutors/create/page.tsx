'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormMultiSelectField from '@/components/Forms/FormMultiSelectField';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { genderOptions, locationOptions } from '@/constants/global';
import { useSubjectsQuery } from '@/redux/api/subjectApi';

import { useAddTutorMutation } from '@/redux/api/tutorApi';
import { SelectOptions } from '@/types';
import { Button, message } from 'antd';
import { useState } from 'react';

const CreateTutor = () => {
  const [addTutor, { isLoading }] = useAddTutorMutation();

  const { data } = useSubjectsQuery({
    limit: 100,
    page: 1,
  });
  const subjects = data?.subjects;
  const subjectsOptions = subjects?.map((subject) => {
    return {
      label: subject?.title,
      value: subject?.id,
    };
  });
  const adminOnSubmit = async (values: any) => {
    console.log(values);

    try {
      const res = await addTutor(values);
      if (res && 'data' in res) {
        message.success('Subject created successfully!');
      } else if ('error' in res) {
        message.error('Something went wrong!');
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

      <Form submitHandler={adminOnSubmit}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 '>
            Tutor information
          </h5>

          <div className='grid  md:grid-cols-3 gap-4'>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                First Name
              </label>
              <FormInput name='firstName' size='large' />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Middle Name
              </label>
              <FormInput name='middleName' size='large' />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Last Name
              </label>
              <FormInput name='lastName' size='large' />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Image Url
              </label>
              <FormInput name='imageUrl' size='large' type='url' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Experience
              </label>
              <FormInput name='experience' size='large' />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Gender
              </label>
              <FormSelectField
                size='large'
                name='gender'
                options={genderOptions}
                placeholder='Select'
              />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Location
              </label>
              <FormSelectField name='location' options={locationOptions} />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Expertise Subjects
              </label>
              <FormMultiSelectField
                options={subjectsOptions as SelectOptions[]}
                name='subjects'
              />
            </div>
            <div className='mb-4 space-y-2 md:col-span-2'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Bio
              </label>

              <FormTextArea name='bio' rows={8} />
            </div>
          </div>

          <Button
            size='large'
            className='flex  button-primary rounded-md  px-6   ms-auto '
            htmlType='submit'
            loading={isLoading}
          >
            Create
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateTutor;
