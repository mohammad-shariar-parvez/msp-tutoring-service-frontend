'use client';
import React from 'react';
import FormDatePicker from '../Forms/FormDatePicker';

const ScheduleDataPicker = () => {
  return (
    <div className='sg-form-group'>
      <label className='sg-form-label'>
        Select Date <span className='sg-req'>*</span>
      </label>

      <FormDatePicker name='startDate' label='Date of birth' />
    </div>
  );
};

export default ScheduleDataPicker;
