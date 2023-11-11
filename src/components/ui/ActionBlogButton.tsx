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
  data?: any;
  editUrl?: string;
  editOption?: boolean;
}

const ActionBlogButtons: React.FC<ActionButtonsProps> = ({
  onDetailsHandler,
  deleteHandler,
  editOption = true,
  data,
  editUrl,
}) => {
  const confirm = () => {
    deleteHandler?.(data?.id);
  };

  return (
    <div className='flex space-x-1  '>
      <Button
        className='bg-transparent border-none  ps-0 '
        onClick={() => onDetailsHandler?.(data)}
      >
        <EyeOutlined className='text-orange-800 text-lg hover:text-orange-700 ' />
      </Button>
      {editOption && (
        <Link href={`${editUrl}/${data?.id}`}>
          <Button className='bg-transparent border-none '>
            <EditOutlined className='text-slate-900 text-lg' />
          </Button>
        </Link>
      )}

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
          <DeleteOutlined className='text-red-500 text-lg hover:text-red-400  ' />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ActionBlogButtons;
