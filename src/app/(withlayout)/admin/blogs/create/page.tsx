'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';

import { useAddBlogMutation } from '@/redux/api/blogApi';
import { Button, Col, Row, message } from 'antd';

const CreateServicePage = () => {
  const [addBlog] = useAddBlogMutation();

  const adminOnSubmit = async (values: any) => {


    try {
      const res = await addBlog({ ...values });
      if (!!res) {
        message.success('Blog created successfully!');
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
          { label: 'blogs', link: `/${base}/blogs` },
        ]}
      />

      <Form submitHandler={adminOnSubmit}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 mt-3'>
            Create Blog
          </h5>
          <div className='grid  md:grid-cols-2 gap-4'>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Title
              </label>
              <FormInput name='title' size='large' />
            </div>
            <div className='mb-4 space-y-2 md:col-span-1'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Image Url
              </label>
              <FormInput name='imageUrl' size='large' type='url' />
            </div>
            <div className='mb-4 space-y-2 md:col-span-3'>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Content
              </label>
              <FormTextArea name='content' rows={4} />
            </div>
          </div>
          <Button
            size='middle'
            className='flex  button-primary rounded-md  px-6   ms-auto '
            htmlType='submit'
          >
            Create
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateServicePage;
