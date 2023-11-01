'use client';
import React from 'react';
import FormTimePicker from '../Forms/FormTimePicker';

const ScheduleTimePicker = () => {
  return (
    <div className='sg-form-group'>
      <label className='sg-form-label'>
        Select Time <span className='sg-req'>*</span>
      </label>

      <FormTimePicker name={`startTime`} />
    </div>
  );
};

export default ScheduleTimePicker;
