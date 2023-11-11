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
      const res = await addFaq(values);
      if (!!res) {
        message.success('FAQS created successfully!');
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
      <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 mt-3'>
        Create FAQ
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
            <Col span={16} style={{ margin: '10px 0' }}>
              <FormInput name='question' label='Question' size='large' />
            </Col>

            <Col span={16} style={{ margin: '10px 0' }}>
              <FormTextArea
                maxLength={300}
                name='answer'
                label='Answer'
                rows={4}
                placeholder={'Max length is 300 character'}
              />
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

export default CreateFaqPage;
