import { Row, Space, Spin } from 'antd';

const Loading = () => {
  return (
    <Row
      justify='center'
      align='middle'
      style={{
        height: '30px',
      }}
      className='bg- bg-red-500'
    >
      <Space>
        <Spin tip='Loading' size='large'></Spin>
      </Space>
    </Row>
  );
};

export default Loading;
