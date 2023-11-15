import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { Badge } from 'antd';
import { HeartOutlined, BellOutlined } from '@ant-design/icons';
import { useNotificationsQuery } from '@/redux/api/notificationApi';
// import { useRouter } from 'next/router';
import socketIO from 'socket.io-client';

const ENDPOINT = 'http://localhost:5010/' || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const Notification = () => {
  //   const router = useRouter();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { data, refetch } = useNotificationsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [audio] = useState(
    new Audio(
      'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
    )
  );

  const playerNotificationSound = () => {
    // console.log('hellooooo');

    audio.play();
  };

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      //   console.log('yoo yoooo', data);
      refetch();
      playerNotificationSound();
    });

    // console.log('yoooooooo');
  }, []);

  //   useEffect(() => {
  //     // Trigger refetch when shouldRefetch is true
  //     if (shouldRefetch) {
  //       console.log('ollllaa');
  //     //   setShouldRefetch(false); // Reset the flag
  //     }
  //   }, [shouldRefetch]);

  console.log(data);

  const notificationData = data?.notification;

  //   console.log(notificationData);
  //   console.log(data.meta);

  return (
    <Link href='/wishlist'>
      <Badge size='small' count={data?.meta?.total}>
        <BellOutlined className=' text-lg cursor-pointerp-1  text-pink-600' />
      </Badge>
    </Link>
  );
};

export default Notification;
