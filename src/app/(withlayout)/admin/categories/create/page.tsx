'use client';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UploadFreeImage from '@/components/ui/UploadFreeIMage';
import UploadImage from '@/components/ui/UploadImage';
import { useAddCategoryMutation } from '@/redux/api/category';

import { Button, Col, Row, message } from 'antd';

const CreateCategoryPage = () => {
  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
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

      <Form submitHandler={onSubmit}>
        <div className='bg-[#e6f3f9] p-4 my-2'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900 mb-4 '>
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
              {/* <FormInput name='imageUrl' size='large' type='file' /> */}
              {/* <UploadFreeImage /> */}
              {/* <UploadImage name='file' /> */}
            </div>
            <Button
              size='large'
              className=' button-primary block  ms-auto   rounded-md  px-6 '
              htmlType='submit'
            >
              Create
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateCategoryPage;
