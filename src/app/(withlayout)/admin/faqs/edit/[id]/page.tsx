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
import { useFaqQuery, useUpdateFaqsMutation } from '@/redux/api/faqApi';

import { Button, Col, Row, message } from 'antd';

const EditFaqsPage = ({ params }: any) => {
  const { data: faqdata, isLoading } = useFaqQuery(params?.id);

  const [updateFaqs] = useUpdateFaqsMutation();

  //@ts-ignore
  // console.log(isLoading);

  const onSubmit = async (values: any) => {
    try {
      const res = await updateFaqs({
        id: params?.id,
        body: values,
      }).unwrap();
      if (res?.id) {
        message.success('FAQ Successfully Updated!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    question: faqdata?.question || '',
    answer: faqdata?.answer || '',
  };
  // console.log('YOOOO', faqdata);

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
              Update Faqs
            </h5>
            <div className=' md:w-1/3'>
              <div className='mb-4 space-y-2 '>
                <label className='font-bold text-base text-[#565656] mb-2'>
                  Question
                </label>

                <FormInput name='question' size='large' />
              </div>
              <div className='mb-4 space-y-2 '>
                <label className='font-bold text-base text-[#565656] mb-2'>
                  Answer
                </label>
                <FormTextArea
                  maxLength={300}
                  name='answer'
                  rows={4}
                  placeholder={'Max length is 300 character'}
                />
              </div>
              <Button
                size='large'
                className=' button-primary block ms-auto   rounded-md  px-6 '
                htmlType='submit'
              >
                Update
              </Button>
            </div>
          </div>
        </Form>
      </>
    </div>
  );
};

export default EditFaqsPage;
