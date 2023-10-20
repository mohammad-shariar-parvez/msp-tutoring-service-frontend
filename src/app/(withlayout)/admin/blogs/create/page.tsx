'use client';

import CategoryField from '@/components/Forms/CategoryField';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { locationOptions, serviceStatus } from '@/constants/global';
import { useAddBlogMutation } from '@/redux/api/blogApi';
import { useAddServiceMutation } from '@/redux/api/serviceApi';
import { Button, Col, Row, message } from 'antd';

const CreateServicePage = () => {
  const [addBlog] = useAddBlogMutation();

  const adminOnSubmit = async (values: any) => {
    // console.log(values);

    try {
      const res = await addBlog(values);
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

            <Col span={16} style={{ margin: '10px 0' }}>
              <FormTextArea name='content' label='Content' rows={4} />
            </Col>
          </Row>
          <Button htmlType='submit'>Create</Button>
        </div>
      </Form>
    </>
  );
};

export default CreateServicePage;
