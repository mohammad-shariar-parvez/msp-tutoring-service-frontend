'use client';
import React from 'react';
import FormTimePicker from '../Forms/FormTimePicker';

const ScheduleTimePicker = () => {
  return (
    <div className='sg-form-group'>
      <label className='sg-form-label'>
        Select Date <span className='sg-req'>*</span>
      </label>

      <FormTimePicker name={`startTime`} label='Start time' />
    </div>
  );
};

export default ScheduleTimePicker;
