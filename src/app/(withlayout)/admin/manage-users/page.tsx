'use client';

import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';

import { Button, Input, message } from 'antd';

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

const ManageUsersPage = () => {
  const query: Record<string, any> = { role: 'user' };

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

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
      if (res) {
        message.success('User Deleted successfully');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
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
        console.log(data);

        return (
          <>
            <Button
              onClick={() =>
                updateUser({
                  id: data?.id,
                  body: { role: 'admin' },
                })
              }
              className=' button-primary '
              type='primary'
            >
              Make Admin
            </Button>

            <Button
              onClick={() => deleteHandler(data?.id)}
              className='bg-transparent border-none '
            >
              <DeleteOutlined className='text-red-500 text-lg ' />
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

      <ActionBar title='User List'>
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
        <div className='flex space-x-1 '>
          <Link href='/admin/courses/create'>
            <Button className=' button-primary '>Create</Button>
          </Link>
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
        dataSource={users}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageUsersPage;
