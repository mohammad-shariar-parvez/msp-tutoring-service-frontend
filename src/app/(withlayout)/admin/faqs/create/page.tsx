'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddBlogMutation } from '@/redux/api/blogApi';
import { useAddFaqMutation } from '@/redux/api/faqApi';
import { Button, Col, Row, message } from 'antd';

const CreateFaqPage = () => {
  const [addFaq] = useAddFaqMutation();

  const adminOnSubmit = async (values: any) => {
    // console.log(values);

    try {
      message.loading('Creating');
      const res = await addFaq(values);
      if (res && 'data' in res) {
        message.success('FAQ created successfully!');
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
          { label: 'faqs', link: `/${base}/faqs` },
        ]}
      />

      <Form submitHandler={adminOnSubmit}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 '>
            Create FAQS
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
              className=' button-primary block ms-auto    rounded-md  px-6 '
              htmlType='submit'
            >
              Create
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateFaqPage;
