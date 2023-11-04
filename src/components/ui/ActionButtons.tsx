import { Button } from 'antd';
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
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDetailsHandler,
  deleteHandler,
  data,
  editUrl,
}) => {
  return (
    <div className='flex space-x-1'>
      <Button
        className='bg-transparent border-none '
        onClick={() => onDetailsHandler?.(data)}
      >
        <EyeOutlined className='text-orange-800 text-lg' />
      </Button>
      <Link href={`${editUrl}/${data?.id}`}>
        <Button className='bg-transparent border-none '>
          <EditOutlined className='text-slate-900 text-lg' />
        </Button>
      </Link>
      <Button
        className='bg-transparent border-none '
        onClick={() => deleteHandler?.(data?.id)}
      >
        <DeleteOutlined className='text-red-500 text-lg ' />
      </Button>
    </div>
  );
};

export default ActionButtons;
