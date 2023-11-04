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
      <h1> Share Your Feedback</h1>
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
              <FormTextArea name='description' label='Description' rows={4} />
            </Col>
          </Row>
          <Button htmlType='submit'>submit</Button>
        </div>
      </Form>
    </>
  );
};

export default CreateFeedbackPage;
