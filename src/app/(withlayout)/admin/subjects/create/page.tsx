'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddSubjectMutation } from '@/redux/api/subjectApi';
import { subjectSchema } from '@/schemas/subject';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, message } from 'antd';

const CreateSubjects = () => {
  const [addSubject, { isLoading }] = useAddSubjectMutation();

  const adminOnSubmit = async (values: any) => {
    try {
      const res = await addSubject(values);

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
          { label: 'subjects', link: `/${base}/subjects` },
        ]}
      />

      <Form submitHandler={adminOnSubmit} resolver={yupResolver(subjectSchema)}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 '>
            Subject information
          </h5>
          <div className='grid  md:grid-cols-3 gap-4'>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Title
              </label>
              <FormInput name='title' size='large' />
            </div>
          </div>
          <Button
            size='large'
            className=' button-primary  block  ms-auto  rounded-md  px-6 '
            htmlType='submit'
            loading={isLoading}
          >
            Create
          </Button>
        </div>
        {/* <FormDynamicFields /> */}
      </Form>
    </>
  );
};

export default CreateSubjects;
