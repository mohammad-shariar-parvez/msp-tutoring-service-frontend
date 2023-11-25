'use client';
import React from 'react';
import FormDatePicker from '../Forms/FormDatePicker';

const ScheduleDataPicker = () => {
  return (
    <div className='sg-form-group'>
      <label className='text-[#565656] font-medium '>
        Select Date <span className='sg-req'>*</span>
      </label>

      <FormDatePicker name='startDate' />
    </div>
  );
};

export default ScheduleDataPicker;
