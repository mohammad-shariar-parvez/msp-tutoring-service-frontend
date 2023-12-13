'use client';

import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import Link from 'next/link';

import React from 'react';

function PaymentResultPage({ searchParams }: any) {
  const { status } = searchParams;

  const resultTitle =
    status === 'success' ? 'Successfully Paid' : 'Something Went Wrong...';
  return (
    <>
      <Result
        status={status as ResultStatusType}
        title={resultTitle}
        extra={[
          <Link href='/user/bookings' key='1'>
            <Button
              type='primary'
              //   onClick={() => {
              //     router.push('/user/bookings');
              //   }}
              className='bg-primary'
            >
              Back to payment list
            </Button>
            ,
          </Link>,
        ]}
      />
    </>
  );
}

export default PaymentResultPage;
