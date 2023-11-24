'use client';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { ConfigProvider, FloatButton } from 'antd';

const BackTop = () => (
  <>
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorBgElevated: '#335880 ',
          colorText: 'white',
        },
      }}
    >
      <FloatButton.Group shape='circle' className='bottom-[60px] right-[10px]'>
        <FloatButton.BackTop visibilityHeight={7000} />
      </FloatButton.Group>
    </ConfigProvider>
  </>
);

export default BackTop;
