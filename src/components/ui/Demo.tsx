'use client';
import { Button, Col, Input, Row, message } from 'antd';
import Image from 'next/image';
import React from 'react';
import demo from '../../assets/req-demo-tutor.png';
import FormTextArea from '../Forms/FormTextArea';
import Form from '../Forms/Form';
import FormInput from '../Forms/FormInput';
import { useAddQuestionMutation } from '@/redux/api/feedback';
import socketIO from 'socket.io-client';

const ENDPOINT = 'http://localhost:5010/' || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });
const Demo = () => {
  const [addQuestion] = useAddQuestionMutation();
  const questionOnSubmit = async (values: any) => {
    try {
      const res = await addQuestion(values);
      if (!!res) {
        message.success('Question sent successfully!');
        socketId.emit('notification', {
          name: values.name,
          requirement: values.requirement,
        });
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <section className='bg-[#fbfeff] mb-16  py-16 '>
      <div className='container'>
        <div className='grid grid-cols-2 gap-10'>
          <div className='  req-demo-info-cnt'>
            <div className='flex justify-between mt-8'>
              <div className='req-demo-step'>
                <h4>
                  <span>Tell us your</span>
                  <small>Needs</small>
                </h4>
                <h6>1</h6>
              </div>
              <div className='req-demo-step'>
                <h4>
                  <span>Schedule </span>
                  <small>Class</small>
                </h4>
                <h6>2</h6>
              </div>
              <div className='req-demo-step'>
                <h4>
                  <span>Confirm if you </span>
                  <small>Like</small>
                </h4>
                <h6>3</h6>
              </div>
            </div>
            <div className='req-demo-info-img'>
              <Image
                src={demo}
                width={500}
                alt='req demo tutor'
                className='img-fluid'
              />
            </div>
          </div>

          <div className=''>
            <Form submitHandler={questionOnSubmit}>
              <div className='req-demo-form p-4 '>
                <h3 className='mb-9 text-[#10858b] mt-3 text-center text-3xl'>
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
