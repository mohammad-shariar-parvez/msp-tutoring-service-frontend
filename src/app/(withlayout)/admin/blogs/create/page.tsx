'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';

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
    // console.log(values);

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
      <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 mt-3'>
        Create Blog
      </h5>
      <Form submitHandler={adminOnSubmit}>
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput name='title' label='Title' size='large' />
            </Col>

            <Col span={8} style={{ margin: '10px 0' }}>
              <FormInput
                name='imageUrl'
                label='Image Url'
                size='large'
                type='url'
              />
            </Col>

            <Col span={16} style={{ margin: '10px 0' }}>
              <FormTextArea name='content' label='Content' rows={4} />
            </Col>
          </Row>
          <Button className=' button-primary' htmlType='submit'>
            Create
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateServicePage;
