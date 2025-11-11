'use client';

import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import TutorField from '@/components/Forms/TutorField';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { locationOptions, courseStatus } from '@/constants/global';
import { useAddCourseMutation } from '@/redux/api/courseApi';
import { useSubjectsQuery } from '@/redux/api/subjectApi';
import { SelectOptions } from '@/types';

import { Button, message } from 'antd';
import { useState } from 'react';

const CreateServicePage = () => {
  const [addCourse] = useAddCourseMutation();
  const [locateTutor, setLocateSutor] = useState<string>('');

  const [subjectId, setSubjectId] = useState<string | undefined>('');

  const adminOnSubmit = async (values: any) => {
    const price = parseFloat(values.price);
    const updatedValues = !isNaN(price) && {
      ...values,
      price,
      location: locateTutor,
      subjectId: subjectId,
    };

    console.log(updatedValues);

    try {
      message.loading('Creating');
      const res = await addCourse(updatedValues);
      if (res && 'data' in res) {
        message.success('Course created successfully!');
      } else if ('error' in res) {
        message.error('Something went wrong!');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const { data } = useSubjectsQuery({
    limit: 100,
    page: 1,
  });

  const subjects = (data?.subjects ?? []).map(
    (sub: { title: any; id: any }) => {
      return {
        label: sub.title,
        value: sub.id,
      };
    }
  );

  const base = 'admin';
  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'courses', link: `/${base}/courses` },
        ]}
      />

      <Form submitHandler={adminOnSubmit}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 '>
            Course information
          </h5>
          <div className='grid  md:grid-cols-3 gap-4'>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Title
              </label>
              <FormInput name='title' size='large' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Slug
              </label>
              <FormInput name='slug' size='large' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Location
              </label>
              <FormSelectField
                size='large'
                name='location'
                options={locationOptions}
                handleChange={(el) => setLocateSutor(el)}
              />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Subject
              </label>
              <FormSelectField
                name='subjectId'
                size='large'
                label={undefined}
                options={subjects as SelectOptions[]}
                handleChange={(el) => setSubjectId(el)}
              />
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
              <CategoryField name='categoryId' />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Tutor
              </label>
              <TutorField
                name='courseTutorId'
                locateTutor={locateTutor ? locateTutor : ''}
                subjectId={subjectId ? subjectId : ''}
              />
            </div>

            <div className='mb-4 space-y-2 md:col-span-1 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Status
              </label>
              <FormSelectField
                size='large'
                name='status'
                options={courseStatus}
              />
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
              <FormTextArea name='description' rows={8} richText />
            </div>
          </div>
          <Button
            size='large'
            className=' button-primary  block  ms-auto  rounded-md  px-6 '
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
