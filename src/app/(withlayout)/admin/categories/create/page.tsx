'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddCategoryMutation } from '@/redux/api/category';

import { Button, Col, Row, message } from 'antd';

const CreateCategoryPage = () => {
  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (data: any) => {
    message.loading('Creating.....');
    try {
      await addCategory(data);
      message.success('Category added successfully');
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const base = 'admin';
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'Categories', link: `/${base}/categories` },
        ]}
      />
      <h1>Create Category</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: '10px 0' }}>
            <div className='mb-4'>
              <FormInput
                name='title'
                label='Category Name'
                size='large'
                type='text'
              />
            </div>
            <div className='mb-2'>
              <FormInput name='slug' label='Slug' size='large' type='text' />
            </div>
            <div className='mb-2'>
              <FormInput
                name='imageUrl'
                label='Image Url'
                size='large'
                type='url'
              />
            </div>
          </Col>
        </Row>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateCategoryPage;
