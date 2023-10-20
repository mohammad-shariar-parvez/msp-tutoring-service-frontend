'use client';
import { Input } from 'antd';
import React from 'react';
import FormInput from '../Forms/FormInput';

const BasicInfo = () => {
  return (
    <div>
      <div className='sg-form-group'>
        <label className='sg-form-label'>
          Name <span className='sg-req'>*</span>
        </label>

        <FormInput
          type='text'
          name='firstName'
          placeholder='First Name'
          size='large'
        />
      </div>
      <div className='sg-form-group'>
        <label className='sg-form-label'>
          Name <span className='sg-req'>*</span>
        </label>

        <FormInput
          type='text'
          name='middleName'
          placeholder='Middle Name'
          size='large'
        />
      </div>
      <div className='sg-form-group'>
        <label className='sg-form-label'>
          Name <span className='sg-req'>*</span>
        </label>
        <FormInput
          type='text'
          name='lastName'
          placeholder='Last Name'
          size='large'
        />
      </div>

      <div className='sg-form-group'>
        <label className='sg-form-label'>
          Location <span className='sg-req'>*</span>
        </label>
        <FormInput
          type='text'
          name='location'
          size='large'
          placeholder='Location'
        />
      </div>
    </div>
  );
};

export default BasicInfo;
