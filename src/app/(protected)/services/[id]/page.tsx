'use client';
import { Button, Col, Input, Rate, Row } from 'antd';
import React, { useState } from 'react';
import Link from 'next/link';
import center from '../../../../assets/centre.png';
import Image from 'next/image';
import FormTextArea from '@/components/Forms/FormTextArea';
import Form from '@/components/Forms/Form';
import BasicInfo from '@/components/UserForms/BasicInfo';
import ScheduleDataPicker from '@/components/UserForms/ScheduleDataPicker';
import ScheduleTimePicker from '@/components/UserForms/ScheduleTimePicker';
import StepperForm from '@/components/StepperForm/StepperForm';

const ServiceCourse = () => {
  const [value, setValue] = useState(3);
  const steps = [
    {
      title: ' Information',
      content: <BasicInfo />,
    },
    {
      title: ' Date',
      content: <ScheduleDataPicker />,
    },
    {
      title: ' Time ',
      content: <ScheduleTimePicker />,
    },
  ];
  const handleStudentSubmit = async (values: any) => {
    // console.log('STEPPR', values);
  };

  const reviewOnSubmit = async (values: any) => {
    const finalValue = { ...values, rating: value };
    // console.log(finalValue);

    // message.loading('Updating...');
    // try {
    //   const res = await updateProfile({ body: values });
    //   if (!!res) {
    //     message.success('Profile updated successfully!');
    //   }
    // } catch (err: any) {
    //   console.error(err.message);
    // }
  };

  return (
    <div className='author-main-area'>
      <div className='container'>
        <div className='bg-white p-6'>
          <div>
            <Link href='https://study-ground.com/tutors/ghaziabad'>
              <i className='fas fa-chevron-left fa-fw'></i> Back{' '}
              <span>to search results</span>
            </Link>
          </div>
          <div>
            <Row>
              <Col xs={24} md={24} lg={4}>
                <div className='className=' p-4>
                  <Image
                    src={center}
                    width={500}
                    height={500}
                    alt='eagle_image'
                    className='auth-pic'
                  />
                </div>
              </Col>

              <Col xs={24} md={24} lg={15}>
                <div className='p-4'>
                  <div className='hg'>
                    <h1>MD Mamunur</h1>
                  </div>

                  <div>
                    <small>
                      Maths, math, mathematics, maths english science,
                      mathematics, English, mathematics and science, math,
                      english, english, science, social science, social science
                      , tutor in Crossing republik
                    </small>
                  </div>

                  <div className='hg-p pt-1'>
                    <p>
                      India,Uttar Pradesh,Ghaziabad,Ghaziabad,201009,Crossing
                      Republik
                    </p>
                  </div>
                  <div className='py-2'>
                    <button className='buttonCOurse '>Contact</button>
                    <button className='buttonCOurse'>Contact</button>
                  </div>
                </div>
              </Col>

              <Col xs={24} md={24} lg={5}>
                <div>
                  <Row justify='space-between' className='pb-4'>
                    <div>
                      <p>Gender</p>
                    </div>
                    <div>
                      <p>Male</p>
                    </div>
                  </Row>
                  <Row justify='space-between' className='pb-4'>
                    <div>
                      <p>Experience</p>
                    </div>
                    <div>
                      <p>30 years</p>
                    </div>
                  </Row>
                  <Row justify='space-between' className='pb-4'>
                    <div>
                      <p>Age</p>
                    </div>
                    <div>
                      <p>Male</p>
                    </div>
                  </Row>
                </div>
                <div></div>
                <div></div>
              </Col>
            </Row>
          </div>
        </div>
        {/* Line */}

        <div className='flex justify-start bg-white p-4 my-5 divide-x'>
          <div className='px-4 font-bold text-md '>
            <p>Information</p>
          </div>
          <div className='px-4 font-bold text-md '>
            <p>Article</p>
          </div>
        </div>
        {/*  INFO*/}
        <div className='p-4 my-5 divide-y '>
          <Row>
            <Col xs={24} md={24} lg={14}>
              <div className='m-2'>
                <div className='p-4 bg-white '>
                  <div>
                    <h1 className='font-bold text-md pb-4'>About</h1>
                    <p className='text-gray-500'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum recusandae possimus sequi vero ut? Nesciunt!
                    </p>
                  </div>
                </div>
                <hr />
                <div className='p-4 bg-white'>
                  <div>
                    <h1 className='font-bold text-md pb-4'>
                      Interactive Learning
                    </h1>
                    <p className='text-gray-500'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum recusandae possimus sequi vero ut? Nesciunt!
                    </p>
                  </div>
                </div>

                <div className='p-4 bg-white'>
                  <div>
                    <h1 className='font-bold text-md pb-4'>
                      Interactive Learning
                    </h1>
                    <p className='text-gray-500'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum recusandae possimus sequi vero ut? Nesciunt!
                    </p>
                  </div>
                </div>
                {/* Review */}
                <div className='p-4 bg-sky-50'>
                  <div>
                    <h1 className='font-bold text-md pb-4'>
                      Interactive Learning
                    </h1>

                    <Form submitHandler={reviewOnSubmit}>
                      <Rate onChange={setValue} value={value} />;
                      <FormTextArea name='bio' label='Review' rows={4} />
                      <Button className='buttonCOurse mt-3' htmlType='submit'>
                        submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
            {/* Stepper */}
            <Col xs={24} md={24} lg={10}>
              <div className='m-2 '>
                <div className='req-demo-form '>
                  <h3>Request For Demo</h3>
                  {steps && (
                    <StepperForm
                      persistKey='student-create-form'
                      submitHandler={(value) => {
                        handleStudentSubmit(value);
                      }}
                      steps={steps}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
          {/* Comments */}
          <Row>
            <Col xs={24} md={24} lg={24}>
              <div className='p-4 bg-white py-10 my-8'>
                <h1 className='text-lg font-semibold mb-6'>User Reviews</h1>
                <div className='flex justify-between items-center'>
                  <h1 className='font-bold text-md pb-4'>
                    Interactive Learning
                  </h1>
                  <div>
                    <Rate />
                  </div>
                </div>
                <p className='text-gray-500'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum recusandae possimus sequi vero ut? Nesciunt!
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ServiceCourse;
