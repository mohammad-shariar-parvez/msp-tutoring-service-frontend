'use client';

import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import TutorField from '@/components/Forms/TutorField';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { locationOptions, courseStatus } from '@/constants/global';
import { useCourseQuery, useUpdateCourseMutation } from '@/redux/api/courseApi';
import { useSubjectsQuery } from '@/redux/api/subjectApi';
import { SelectOptions } from '@/types';

import { Button, Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';

const EditServicePage = ({ params }: any) => {
  const [locateTutor, setLocateSutor] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string | undefined>('');
  const { data: courseData, isLoading: loading } = useCourseQuery(params?.id);
  const [defaultValues, setDefaultValues] = useState({
    slug: courseData?.slug,
    title: courseData?.title || '',
    price: courseData?.price || '',
    imageUrl: courseData?.imageUrl || '',
    description: courseData?.description || '',
    duration: courseData?.duration || null,
    courseTutorId: courseData?.courseTutorId || undefined,
    categoryId: courseData?.categoryId || undefined,
    status: courseData?.status || '',
    subjectId: courseData?.subjectId || '',
    location: courseData?.location || '',
  });
  console.log(courseData);
  const [updateCourse] = useUpdateCourseMutation();

  //@ts-ignore

  const onSubmit = async (values: any) => {
    const price = parseFloat(values.price);

    const updatedValues = !isNaN(price) && {
      ...values,
      price,
    };

    try {
      const res = await updateCourse({
        id: params?.id,
        body: updatedValues,
      }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success('Course Successfully Updated!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const { data } = useSubjectsQuery({
    limit: 100,
    page: 1,
  });
  // console.log(courseData);

  const subjects = (data?.subjects ?? []).map((sub) => {
    return {
      label: sub.title,
      value: sub.id,
    };
  });
  // console.log('Yoo yoo', defaultValues);

  useEffect(() => {
    // Set the initial default values when the component mounts
    setDefaultValues({
      slug: courseData?.slug,
      title: courseData?.title || '',
      price: courseData?.price || '',
      imageUrl: courseData?.imageUrl || '',
      description: courseData?.description || '',
      duration: courseData?.duration || null,
      courseTutorId: courseData?.courseTutorId || undefined,
      categoryId: courseData?.categoryId || undefined,
      status: courseData?.status || '',
      subjectId: courseData?.subjectId || '',
      location: courseData?.location || '',
    });
  }, [courseData]);
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'admin',
            link: '/admin',
          },
          {
            label: 'courses',
            link: '/admin/courses',
          },
        ]}
      />

      <>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                <FormSelectField name='status' options={courseStatus} />
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
                <FormTextArea name='description' rows={8} />
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
    </div>
  );
};

export default EditServicePage;
