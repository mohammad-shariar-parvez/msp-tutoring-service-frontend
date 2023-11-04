'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import {
  useCategoryQuery,
  useUpdateCategoryMutation,
} from '@/redux/api/category';

import { Button, Col, Row, message } from 'antd';

type IDProps = {
  params: any;
};

const EditCategoryPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = async (values: { title: string; imageUrl: string }) => {
    message.loading('Updating.....');
    try {
      //   console.log(data);
      await updateCategory({ id, body: values }).unwrap();
      message.success('Category updated successfully');
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    title: data?.title || '',
    imageUrl: data?.imageUrl || '',
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
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
              <FormInput
                name='imageUrl'
                label='Category Url'
                size='large'
                type='url'
              />
            </div>
          </Col>
        </Row>
        <Button type='primary' htmlType='submit'>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditCategoryPage;
