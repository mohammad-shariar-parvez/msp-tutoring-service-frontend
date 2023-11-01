'use client';
import React from 'react';
import FormDatePicker from '../Forms/FormDatePicker';

const PaymentINfo = () => {
  return (
    <div className='sg-form-group'>
      <label className='sg-form-label'>
        Select Date <span className='sg-req'>*</span>
      </label>

      <FormDatePicker name='startDate' />
    </div>
  );
};

export default PaymentINfo;
