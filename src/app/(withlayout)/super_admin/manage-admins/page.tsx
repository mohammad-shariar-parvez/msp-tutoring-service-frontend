'use client';

import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';

import { Button, Empty, Input, Modal, Popconfirm, message } from 'antd';

import { useState } from 'react';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';

import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
} from '@/redux/api/userApi';
import Link from 'next/link';
import ActionButtons from '@/components/ui/ActionButtons';
import Image from 'next/image';

const ManageUsersPage = () => {
  const query: Record<string, any> = { role: 'admin' };
  const [deleteUser] = useDeleteUserMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<any>({});

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
  const { data, isLoading } = useUsersQuery({ ...query });

  const users = data?.users;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      const res = await deleteUser(id);
      if (res && 'data' in res) {
        message.success('User Deleted successfully!');
      } else if ('error' in res) {
        message.error('Something went wrong!');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    // {
    //   title: ' Name',
    //   render: function (data: any) {
    //     return data.firstName + ' ' + data.lastName;
    //   },
    // },
    {
      title: 'Email',
      dataIndex: 'email',
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
            <ActionButtons
              data={data}
              onDetailsHandler={onDetailsHandler}
              deleteHandler={deleteHandler}
              editOption={false}
            />
          </>
        );
      },
    },
  ];
  const onDetailsHandler = (values: any) => {
    // console.log(values);

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

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'Super Admin',
            link: '/super-admin',
          },
        ]}
      />

      <ActionBar title='Admin List'>
        <Input
          type='text'
          size='large'
          placeholder='Search...'
          className='w-64'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className='space-x-2'>
          <Link href='/super_admin/manage-admins/create'>
            <Button className='button-primary' type='primary'>
              Create
            </Button>
          </Link>

          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type='primary'
              className='bg-sky-400'
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={users}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <>
        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <div className='flex flex-col gap-4 '>
            {details?.imageUrl ? (
              <Image
                src={details.imageUrl}
                height={100}
                width={150}
                alt='details category'
                className='h-auto'
              />
            ) : (
              <Empty description='Image not available' />
            )}
            <div>
              <strong className=' w-[30%] inline-block'>Name</strong>
              <span>
                {details?.profile?.firstName} {details?.profile?.middleName}
                {details?.profile?.lastName}
              </span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>ID</strong>
              <span>{details?.id}</span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Email</strong>
              <span>{details?.email}</span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Exprience</strong>
              <span>{details?.role}</span>
            </div>

            <div>
              <strong className=' w-[30%] inline-block'>Contact No</strong>
              <span>{details?.profile?.contactNo}</span>
            </div>

            <div>
              <strong className=' w-[30%] block mb-2'>Bio</strong>
              <span>{details?.profile?.bio}</span>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ManageUsersPage;
