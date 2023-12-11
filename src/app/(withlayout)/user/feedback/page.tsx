'use client';
import Form from '@/components/Forms/Form';
import FormTextArea from '@/components/Forms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddCourseMutation } from '@/redux/api/courseApi';
import { Button, Col, Row, message } from 'antd';

const CreateFeedbackPage = () => {
  const [addCourse] = useAddCourseMutation();

  const adminOnSubmit = async (values: any) => {
    try {
      const res = await addCourse(values);
      if (!!res) {
        message.success('Thank You!');
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const base = 'user';
  return (
    <>
      <UMBreadCrumb items={[{ label: `${base}`, link: `/${base}` }]} />

      <Form submitHandler={adminOnSubmit}>
        <div className='bg-[#e6f3f9] py-8 px-4 md:p-8 '>
          <h5 className='text-xl font-bold tracking-tight text-gray-900 mb-4 '>
            Please give me your feedback
          </h5>
          <div>
            <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
              <Col span={16}>
                <FormTextArea name='description' rows={4} maxLength={150} />
                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  className=' button-primary  block  ms-auto  rounded-md  px-6 mt-4'
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateFeedbackPage;
