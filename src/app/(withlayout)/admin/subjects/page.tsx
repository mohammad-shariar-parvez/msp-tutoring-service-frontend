'use client';
import { ReloadOutlined } from '@ant-design/icons';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';

import { Button, Input, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';

import ActionButtons from '@/components/ui/ActionButtons';

import {
  useDeleteSubjectMutation,
  useSubjectsQuery,
} from '@/redux/api/subjectApi';

const Subjects = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteSubject, { isLoading: deleteLoading }] =
    useDeleteSubjectMutation();

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
  const { data, isLoading } = useSubjectsQuery({ ...query });

  const subjects = data?.subjects;
  const meta = data?.meta;
  // console.log(subjects);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
      render: (text: string) => (
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text}
        </div>
      ),
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
            deleteHandler={deleteHandler}
            editUrl={'/admin/subjects/edit/'}
          />
        );
      },
    },
  ];

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      const res = await deleteSubject(id);

      if (res && 'data' in res) {
        message.success('Subject created successfully!');
      } else if ('error' in res) {
        message.error('Something went wrong!');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
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

      <ActionBar title='Subject List'>
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
          <Link href='/admin/subjects/create'>
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
        dataSource={subjects}
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

export default Subjects;
