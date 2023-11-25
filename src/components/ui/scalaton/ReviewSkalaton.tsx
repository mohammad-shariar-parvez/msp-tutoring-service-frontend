import React from 'react';

import { Skeleton } from 'antd';

const ReviewSkalaton: React.FC = () => (
  <div className='pt-2'>
    <Skeleton avatar paragraph={{ rows: 1 }} />
  </div>
);

export default ReviewSkalaton;
