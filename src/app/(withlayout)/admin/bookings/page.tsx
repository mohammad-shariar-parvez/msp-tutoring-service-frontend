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

const BookingsPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState<any>({});
  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();

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
      //   console.log(data);
      const res = await deleteBooking(id);
      if (res) {
        message.success('Booking Deleted successfully');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  const editHandlar = async (data: any) => {
    setRowData(data);
    setIsModalOpen(true);
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
            <Button
              onClick={() =>
                updateBooking({
                  id: data?.id,
                  body: { status: 'BOOKED' },
                })
              }
              type='primary'
            >
              Accept
            </Button>

            <Button
              style={{
                margin: '0px 5px',
              }}
              onClick={() => editHandlar(data)}
              type='primary'
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => deleteHandler(data?.id)}
              type='primary'
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

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

      <ActionBar title='Booking List'>
        <Input
          type='text'
          size='large'
          placeholder='Search...'
          style={{
            width: '20%',
          }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
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
        <Button type='primary' onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title='Basic Modal'
          open={isModalOpen}
          onOk={handleOk}
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
            <Button htmlType='submit'>submit</Button>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default BookingsPage;
