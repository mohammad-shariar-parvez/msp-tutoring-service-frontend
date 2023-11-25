'use client';
import { Button, Col, Input, Row, message } from 'antd';
import Image from 'next/image';
import React from 'react';
import demo from '../../assets/req-demo-tutor.png';
import FormTextArea from '../Forms/FormTextArea';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import { useAddQuestionMutation } from '@/redux/api/feedback';
// import socketIO from 'socket.io-client';

// const ENDPOINT = 'http://localhost:5010/' || '';
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });
const Demo = () => {
  const [addQuestion] = useAddQuestionMutation();
  const questionOnSubmit = async (values: any) => {
    try {
      const res = await addQuestion(values);
      if (!!res) {
        message.success('Question sent successfully!');
        // socketId.emit('notification', {
        //   name: values.name,
        //   requirement: values.requirement,
        // });
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <section className='bg-[#fbfeff]  py-16 mb-32 '>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-y-8 md:gap-y-0'>
          <div className='  '>
            <div className='flex justify-between mt-8  space-x-2'>
              <div className=' p-4 bg-white shadow-md text-center space-y-2  rounded-lg   '>
                <span className='font-medium text-2xl block text-secondary'>
                  Tell us your
                </span>
                <span className='font-normal text-xl text-darkGreen block'>
                  Needs
                </span>
                <span className='block text-darkGreen font-medium text-2xl'>
                  1
                </span>
              </div>

              <div className=' p-[15px] bg-white shadow-md text-center space-y-2  rounded-lg   '>
                <span className='font-medium text-2xl block text-secondary '>
                  Get a demo
                </span>
                <span className='font-normal text-xl text-darkGreen block'>
                  Class
                </span>
                <span className='block text-darkGreen font-medium text-2xl'>
                  2
                </span>
              </div>

              <div className=' p-[15px] bg-white shadow-md text-center space-y-2  rounded-lg   '>
                <span className='font-medium text-2xl block text-secondary '>
                  Confirm if you
                </span>
                <span className='font-normal text-xl text-darkGreen block'>
                  Like
                </span>
                <span className='block text-darkGreen font-medium text-2xl'>
                  3
                </span>
              </div>
            </div>
            <div className='req-demo-info-img'>
              <Image
                src={demo}
                width={500}
                alt='req demo tutor'
                className='w-full h-auto'
              />
            </div>
          </div>

          <div className=''>
            <Form submitHandler={questionOnSubmit}>
              <div className='req-demo-form p-4 '>
                <h3 className='mb-9 text-formHeader mt-3 text-center font-medium text-3xl'>
                  Ask A Question
                </h3>
                <div className='sg-form-group'>
                  <label className='sg-form-label'>
                    Name <span className='sg-req'>*</span>
                  </label>

                  <FormInput
                    name='name'
                    size='large'
                    type='text'
                    placeholder='name'
                  />
                </div>
                <div className='sg-form-group'>
                  <label className='sg-form-label'>
                    Phone <span className='sg-req'>*</span>
                  </label>

                  <FormInput
                    name='phone'
                    size='large'
                    type='text'
                    placeholder='Email/Phone number'
                  />
                </div>
                <div className='sg-form-group'>
                  <label className='sg-form-label'>
                    Location <span className='sg-req'>*</span>
                  </label>

                  <FormInput
                    name='location'
                    size='large'
                    type='text'
                    placeholder='Location'
                  />
                </div>
                <div className='sg-form-group'>
                  <label className='sg-form-label'>
                    Your requirement <span className='sg-req'>*</span>
                  </label>
                  <FormTextArea name='requirement' rows={4} />
                </div>
                <div className='sg-form-group text-center'>
                  <Button
                    htmlType='submit'
                    className=' bg-button-primary  text-white   px-3  rounded-md  '
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
