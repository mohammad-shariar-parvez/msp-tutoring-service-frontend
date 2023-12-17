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
     
      await updateCategory({ id, body: values }).unwrap();
      message.success('Category updated successfully');
    } catch (err: any) {
      
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    title: data?.title || '',
    imageUrl: data?.imageUrl || '',
    slug: data?.slug || '',
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

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 '>
            Create Category
          </h5>
          <div className=' md:w-1/3'>
            <div className='mb-4 space-y-2 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Category Name
              </label>
              <FormInput name='title' size='large' type='text' />
            </div>
            <div className='mb-4 space-y-2 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Slug
              </label>
              <FormInput name='slug' size='large' type='text' />
            </div>
            <div className='mb-4 space-y-2 '>
              <label className='font-bold text-base text-[#565656] mb-2'>
                Image Url
              </label>

              <FormInput name='imageUrl' size='large' type='url' />
            </div>
          </div>
          <Button
            size='large'
            className=' button-primary    rounded-md  px-6 '
            htmlType='submit'
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditCategoryPage;
