'use client';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import HTMLReactParser from 'html-react-parser';
import UMCollapse, { ItemProps } from '@/components/ui/UMCollapse';
import { useFaqsQuery } from '@/redux/api/faqApi';

const AccordianFAQ: React.FC = () => {
  const { data } = useFaqsQuery({ limit: 6 });
  const faqsData = data?.faqs;
  const [activeKey, setActiveKey] = useState<string | string[]>(['0']);
  //   console.log(faqsData);

  const getItems = () => {
    const modifiedList = faqsData?.map((item: any, index: string) => ({
      key: index.toString(),
      label: <span className='py-4'>{item?.question}</span>,
      children: (
        <p className='font-normal text-[#212529] text-base leading-8 '>
          {HTMLReactParser(item?.answer || '')}
        </p>
      ),
      style: {
        marginBottom: 24,
        background: activeKey.includes(index.toString()) ? '#E8F3FD' : '#ffff',
        borderRadius: '10px',
        border: 'none',
        padding: '16px 0px',
      },
    }));

    return modifiedList;
  };

  const handleCollapseChange = (keys: string | string[]) => {
    // console.log('KEEETS', keys);

    setActiveKey(keys);
  };

  return (
    <section className=' py-16 mb-32 bg-[#f8FBFF] text-secondary '>
      <div className='container'>
        <h1 className='sub-title sub-title-style text-center '>FAQ</h1>
        <Collapse
          bordered={false}
          defaultActiveKey={['0']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={getItems()}
          className=' border-none text-lg font-semibold bg-inherit  '
          onChange={handleCollapseChange}
        />
      </div>
    </section>
  );
};

export default AccordianFAQ;
