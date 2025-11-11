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
import { useState } from 'react';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';

import {
  useBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from '@/redux/api/bookingApi';
import Form from '@/components/Forms/Form';
import FormDatePicker from '@/components/Forms/FormDatePicker';
import ActionButtons from '@/components/ui/ActionButtons';
import ActionBookingBar from '@/components/ui/ActionBookingBar';
// import socketIO from 'socket.io-client';
import { useAddNotificationMutation } from '@/redux/api/notificationApi';
import { getBaseUrl } from '@/helpers/config/envConfig';

// const ENDPOINT = 'http://localhost:5010/' || '';
const ENDPOINT = getBaseUrl();
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });
const BookingsPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState<any>({});
  const [details, setDetails] = useState<any>({});
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();
  const [addNotification] = useAddNotificationMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
  const { data, isLoading } = useBookingsQuery({ ...query });

  const bookings = data?.bookings;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      const res = await deleteBooking(id);
      //@ts-ignore
      if (res?.error) {
        //@ts-ignore
        message.error(res?.error?.data.message || res?.error.data);
      } else {
        message.success('Booking Deleted successfully ');
      }
    } catch (err: any) {
      console.log(err);
      message.error(err.message);
    }
  };

  const dateOnSubmit = async (values: any) => {
    try {
      const res = await updateBooking({
        id: rowData?.id,
        body: values,
      });
      if (res) {
        message.success('Booking updated successfully');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  /* SEND notification to socket.io */
  const onAcceptHandler = (userId: string, course: string, values: any) => {
    updateBooking(values);
    const x = addNotification({
      userId,
      title: `your ordered - ${course}  course is confirmed .Please pay`,
    });
    console.log('check', x);

    // socketId.emit('notification', {
    //   userId,
    //   title: `your ordered - ${course}  course is confirmed .Please pay`,
    // });
  };

  const onDetailsHandler = (values: any) => {
    setIsModalOpen(true);
    setDetails(values);
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

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY ');
      },
      sorter: true,
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
          <>
            <ActionBookingBar
              data={data}
              onDetailsHandler={onDetailsHandler}
              onAcceptHandler={onAcceptHandler}
              deleteHandler={deleteHandler}
              acceptBooking
            />
          </>
        );
      },
    },
  ];

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

      <ActionBar title='Booking List'>
        <Input
          type='text'
          size='large'
          placeholder='Search...'
          value={searchTerm}
          className='w-64'
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button onClick={resetFilters} type='primary'>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <>
        <Modal
          title='Change Date'
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <Form submitHandler={dateOnSubmit}>
            <div>
              <FormDatePicker
                name='startDate'
                label='Start Date'
                size='large'
              />
              {/* <FormTimePicker name='startDate' label='Start time' /> */}
            </div>
            <Button className=' button-primary my-4' htmlType='submit'>
              submit
            </Button>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default BookingsPage;
