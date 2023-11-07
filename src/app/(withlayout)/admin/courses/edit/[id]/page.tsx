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

import { Button, Col, Row, message } from 'antd';

const EditServicePage = ({ params }: any) => {
  const { data: courseData, isLoading: loading } = useCourseQuery(params?.id);
  //   console.log(courseData);
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

  const defaultValues = {
    slug: courseData?.slug,
    title: courseData?.title || '',
    price: courseData?.price || '',
    imageUrl: courseData?.imageUrl || '',
    description: courseData?.description || '',
    duration: courseData?.duration || null,
    courseTutorId: courseData?.courseTutorId,
    categoryId: courseData?.categoryId || '',
    status: courseData?.status || '',
    location: courseData?.location || '',
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
            label: 'courses',
            link: '/admin/courses',
          },
        ]}
      />

      <>
        <h1>Edit Course</h1>
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
              Course information
            </p>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={8} style={{ margin: '10px 0' }}>
                <FormInput name='title' label='Title' size='large' />
              </Col>
              <div className='mb-4 space-y-2 md:col-span-1'>
                <label className='font-bold text-base text-[#565656] mb-2'>
                  Slug
                </label>
                <FormInput name='slug' size='large' />
              </div>

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
                <CategoryField
                  name='categoryId'
                  label='Category'
                  defaultValue={defaultValues?.categoryId}
                />
              </Col>
              <Col span={8} style={{ margin: '10px 0' }}>
                <TutorField name='courseTutorId' label='Tutor' />
              </Col>

              <Col span={8} style={{ margin: '10px 0' }}>
                <FormSelectField
                  name='status'
                  label='Status'
                  options={courseStatus}
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
