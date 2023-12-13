import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { Badge, Button } from 'antd';
import { BellOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import {
  useDeleteNotificationMutation,
  useNotificationsQuery,
} from '@/redux/api/notificationApi';
// import socketIO from 'socket.io-client';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { INotification } from '@/types';
import { getBaseUrl } from '@/helpers/config/envConfig';

// const ENDPOINT = 'http://localhost:5010/' || '';
const ENDPOINT = getBaseUrl();
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const Notification = () => {
  // console.log(userId);

  const { data, refetch } = useNotificationsQuery({
    limit: 10,
    refetchOnMountOrArgChange: true,
  });
  const [deleteNotification] = useDeleteNotificationMutation();
  // const [audio] = useState(
  //   typeof window !== 'undefined'
  //     ? new window.Audio(
  //         'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
  //       )
  //     : null
  // );

  // const playerNotificationSound = () => {
  //   audio?.play();
  // };

  // useEffect(() => {
  //   socketId.on('newNotification', (data) => {
  //     refetch();
  //     playerNotificationSound();
  //   });
  // }, []);

  const handleDelete = (id: string) => {
    deleteNotification(id);
  };

  // console.log(data);

  const notificationData = data?.notification;
  console.log(notificationData?.length);

  const items: MenuProps['items'] =
    notificationData?.length > 0
      ? notificationData?.map((item: INotification) => ({
          key: item.id,
          label: (
            <div className='flex justify-between items-start space-x-4  '>
              <p className='text-base font-medium text-[#212529]  cursor-pointer bg-transparent border-none'>
                {item.title}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                className='bg-transparent border-none mt-1 '
              >
                <DeleteOutlined
                  // onClick={removeWishList}
                  className=' cursor-pointer   text-red-500 hover:text-red-700 '
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
              <p className=' text-base font-medium text-[#212529]  cursor-pointer bg-transparent border-none'>
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
      overlayClassName={` overflow-y-auto   max-h-[220px] max-w-[250px] md:max-w-xs rounded-lg  `}
      trigger={['click']}
      // className='p-4 rounded-none '
      menu={{ items }}
      placement='bottom'
      arrow
      className='rounded-none px-2 py-4     '
    >
      <Badge
        size='small'
        count={data?.meta?.total}
        style={{ padding: '0px 0px', marginRight: '10px', marginTop: '19px' }}
      >
        <BellOutlined className=' text-lg cursor-pointer p-1 mx-0 px-0 text-pink-600' />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
