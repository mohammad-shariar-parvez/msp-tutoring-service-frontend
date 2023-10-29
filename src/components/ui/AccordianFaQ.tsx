'use client';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import UMCollapse, { ItemProps } from '@/components/ui/UMCollapse';
import { useFaqsQuery } from '@/redux/api/faqApi';

const AccordianFAQ: React.FC = () => {
  const { data } = useFaqsQuery({ limit: 4 });
  const faqsData = data?.faqs;
  //   console.log(faqsData);

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
    panelStyle
  ) => {
    const modifiedList = faqsData?.map((item: any, index: string) => ({
      key: index.toString(),
      label: item?.question,
      children: (
        <p className='font-medium text-gray-700 text-base'>{item?.answer}</p>
      ),
      style: panelStyle,
    }));

    return modifiedList;
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: '#ffff',
    borderRadius: '10px',
    border: 'none',
  };

  return (
    <section className='container mb-24 '>
      <h1 className='sg-title-txt mb-16 text-center'>FAQ</h1>
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={getItems(panelStyle)}
        className='p-4 border-none text-lg font-semibold  bg-blue-50'
      />
    </section>
  );
};

export default AccordianFAQ;
