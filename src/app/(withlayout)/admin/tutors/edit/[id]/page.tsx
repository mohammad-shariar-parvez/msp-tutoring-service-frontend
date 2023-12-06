'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormMultiSelectField from '@/components/Forms/FormMultiSelectField';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { genderOptions, locationOptions } from '@/constants/global';
import { useSubjectsQuery } from '@/redux/api/subjectApi';
import { useTutorQuery, useUpdateTutorMutation } from '@/redux/api/tutorApi';
import { SelectOptions } from '@/types';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';

const EditTutorPage = ({ params }: any) => {
  const { data: tutorData, isLoading: allloading } = useTutorQuery(params?.id);
  const [updateTutor, { isLoading }] = useUpdateTutorMutation();

  const [defaultValues, setDefaultValues] = useState({});
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

  const onSubmit = async (values: any) => {
    try {
      const res = await updateTutor({
        id: params?.id,
        body: values,
      }).unwrap();
      // console.log(res);
      if (res && 'data' in res) {
        message.success('Subject created successfully!');
      } else if ('error' in res) {
        message.error('Something went wrong!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setDefaultValues({
      firstName: tutorData?.firstName || '',
      middleName: tutorData?.middleName || '',
      lastName: tutorData?.lastName || '',
      experience: tutorData?.experience || '',
      bio: tutorData?.bio || '',
      imageUrl: tutorData?.imageUrl || '',
      gender: tutorData?.gender || '',
      location: tutorData?.location || '',
      subjects:
        tutorData?.subjects?.map((item: any) => item?.subject?.id) || [],
    });
  }, [tutorData]);

  const base = 'admin';
  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'tutors', link: `/${base}/tutors` },
        ]}
      />

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
            Update
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditTutorPage;
