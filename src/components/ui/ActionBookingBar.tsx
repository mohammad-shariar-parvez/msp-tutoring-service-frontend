import { Button, ConfigProvider, Popconfirm, message } from 'antd';
import React from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  DeleteFilled,
  EyeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

interface ActionButtonsProps {
  onDetailsHandler?: (detailsData: any) => void;
  deleteHandler?: (deleteData: any) => void;
  onAcceptHandler?: (userId: string, course: string, deleteData: any) => void;

  data?: any;
  editUrl?: string;
  editOption?: boolean;
  acceptBooking?: boolean;
}

const ActionBookingBar: React.FC<ActionButtonsProps> = ({
  onDetailsHandler,
  deleteHandler,
  onAcceptHandler,

  editOption = true,
  data,
  editUrl,
  acceptBooking,
}) => {
  const confirm = () => {
    deleteHandler?.(data?.id);
  };

  return (
    <div className='flex space-x-1'>
      {!(acceptBooking && data?.status === 'CONFIRMED') ? (
        <Button
          className='bg-transparent border-none ps-0  '
          onClick={() =>
            onAcceptHandler?.(data?.userId, data?.course?.title, {
              id: data?.id,
              body: { status: 'CONFIRMED' },
            })
          }
        >
          Accept
        </Button>
      ) : null}
      <Button
        className='bg-transparent border-none '
        onClick={() => onDetailsHandler?.(data)}
      >
        <Button className='bg-transparent border-none '>
          <EditOutlined className='text-slate-900 text-lg hover:text-slate-700' />
        </Button>
      </Button>

      <Popconfirm
        title='Confirm Delete ?'
        onConfirm={confirm}
        okText='Yes'
        cancelText='No'
        okType='danger'
      >
        <Button
          className='bg-transparent border-none '
          // onClick={() => deleteHandler?.(data?.id)}
        >
          <DeleteOutlined className='text-red-500 text-lg ' />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ActionBookingBar;
