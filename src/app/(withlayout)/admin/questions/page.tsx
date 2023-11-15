'use client';
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';

import { Button, Input, Modal, message } from 'antd';

import { useEffect, useState } from 'react';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';
import { format, render, cancel, register } from 'timeago.js';
import {
  useDeleteQuestionsMutation,
  useFeeedbacksQuery,
  useQuestionsQuery,
} from '@/redux/api/feedback';
import ActionButtons from '@/components/ui/ActionButtons';
// import socketIO from 'socket.io-client';

// const ENDPOINT = 'http://localhost:5010/' || '';
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const QuestionPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [deleteQuestions] = useDeleteQuestionsMutation();
  const [sData, setSData] = useState('');

  // const [audio] = useState(
  //   new Audio(
  //     'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
  //   )
  // );

  // const playerNotificationSound = () => {
  //   console.log('hellooooo');

  //   audio.play();
  // };
  // console.log('HELLO)', sData);

  // useEffect(() => {
  //   socketId.on('newNotification', (data) => {
  //     setSData(data);
  //     console.log('yoo yoooo', data);
  //     playerNotificationSound();
  //   });
  // }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data, isLoading } = useQuestionsQuery({ ...query });

  const questions = data?.question;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      const res = await deleteQuestions(id);
      if (res) {
        message.success('Question Deleted successfully');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Requirement',
      dataIndex: 'requirement',
      render: function (data: any) {
        return data.substring(0, 15).concat('.....');
      },
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
      sorter: true,
    },
    {
      title: 'Action',
      render: function (data: any) {
        return (
          <ActionButtons
            data={data}
            onDetailsHandler={onDetailsHandler}
            deleteHandler={deleteHandler}
            editOption={false}
          />
        );
      },
    },
  ];
  const onDetailsHandler = (values: any) => {
    // console.log('Values', values);

    setIsModalOpen(true);
    setDetails(values);
    // console.log(values);
  };
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log('Page:', page, 'PageSize:', pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'admin',
            link: '/admin',
          },
        ]}
      />

      <ActionBar title='Question List'>
        <div className='ml-auto pr-4'>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type='primary'
              style={{ margin: '0px 5px' }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
        <p>HI_</p>

        {format('2016-06-12', 'en_US')}
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={questions}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <>
        <Modal
          title='Requirements'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className=''>
            <h1 className='font-normal text-base'>{details?.requirement}</h1>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default QuestionPage;
