'use client';
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import HTMLReactParser from 'html-react-parser';
import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { locationOptions, courseStatus } from '@/constants/global';
import { useAddBlogMutation } from '@/redux/api/blogApi';
import { Button, Col, Row, message } from 'antd';

const CreateServicePage = () => {
  const [addBlog] = useAddBlogMutation();
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    placeholder: 'Start Typing',
  };

  console.log(content);

  const adminOnSubmit = async (values: any) => {
    // console.log(values);

    try {
      console.log({ ...values, ...{ content } });

      const res = await addBlog({ ...values, ...{ content } });
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
      <h1>Create Service</h1>
      <Form submitHandler={adminOnSubmit}>
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '5px',
            padding: '15px',
            marginBottom: '10px',
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>
            Service information
          </p>
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
            <JoditEditor
              ref={editor}
              value={content}
              //   tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
            />

            {/* <Col span={16} style={{ margin: '10px 0' }}>
              <FormTextArea name='content' label='Content' rows={4} />
            </Col> */}
          </Row>
          <Button htmlType='submit'>Create</Button>
        </div>
      </Form>
      {/* <JoditEditor
        ref={editor}
        value={content}
        //   tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
      /> */}
      {/* <div className='bg-white'>
        <h1 className='my-4 text-center'>DEMO</h1>
        <div>{HTMLReactParser(content)}</div>
      </div> */}
    </>
  );
};

export default CreateServicePage;
