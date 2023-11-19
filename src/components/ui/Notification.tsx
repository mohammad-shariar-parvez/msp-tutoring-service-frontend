import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { Badge, Button } from 'antd';
import { BellOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  useDeleteNotificationMutation,
  useNotificationsQuery,
} from '@/redux/api/notificationApi';
import socketIO from 'socket.io-client';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { INotification } from '@/types';

const ENDPOINT = 'http://localhost:5010/' || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const Notification = () => {
  const { data, refetch } = useNotificationsQuery({
    limit: 10,
    refetchOnMountOrArgChange: true,
  });
  const [deleteNotification] = useDeleteNotificationMutation();
  const [audio] = useState(
    typeof window !== 'undefined'
      ? new window.Audio(
          'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
        )
      : null
  );

  const playerNotificationSound = () => {
    audio?.play();
  };

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      refetch();
      playerNotificationSound();
    });
  }, []);

  const handleDelete = (id: string) => {
    deleteNotification(id);
  };

  // console.log(data);

  const notificationData = data?.notification;

  const items: MenuProps['items'] = notificationData
    ? notificationData?.map((item: INotification) => ({
        key: item.id,
        label: (
          <div className='flex justify-between items-start space-x-4  '>
            <p className='cursor-pointer bg-transparent border-none'>
              {item.title}
            </p>
            <button
              onClick={() => handleDelete(item.id)}
              className='bg-transparent border-none mt-1 '
            >
              <DeleteOutlined
                // onClick={removeWishList}
                className=' cursor-pointer   text-red-500 '
              />
            </button>
          </div>
        ),
      }))
    : [
        {
          key: '0',
          disabled: true,
          label: (
            <p className='cursor-pointer bg-transparent border-none'>
              No Notification Yet
            </p>
          ),
        },
      ];

  return (
    <Dropdown
      overlayStyle={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      overlayClassName={` overflow-y-auto  mt-12 max-h-[220px]  top-4 max-w-[250px] md:max-w-xs rounded-lg z-[0] fixed `}
      menu={{ items }}
      placement='bottomRight'
      arrow={{ pointAtCenter: true }}
      trigger={['click']}
    >
      <Badge
        size='small'
        count={data?.meta?.total}
        style={{ padding: '4px 2px', marginRight: '4px' }}
      >
        <BellOutlined className=' text-lg cursor-pointer p-1 mx-0 px-0 text-pink-600' />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
