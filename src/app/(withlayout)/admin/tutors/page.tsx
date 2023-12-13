'use client';
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import UMTable from '@/components/ui/UMTable';

import { Button, Empty, Input, Modal, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';

import Image from 'next/image';
import { useDeleteTutorMutation, useTutorsQuery } from '@/redux/api/tutorApi';
import ActionButtons from '@/components/ui/ActionButtons';

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [updateTutor] = useDeleteTutorMutation();

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
  const { data, isLoading } = useTutorsQuery({ ...query });

  const tutors = data?.tutors;
  const meta = data?.meta;
  // console.log(tutors);

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      const res = await updateTutor(id);
      if (res) {
        message.success('Course Deleted successfully');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      render: function (data: any) {
        return data.firstName + ' ' + data.lastName;
      },
    },

    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
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
            editUrl={'/admin/tutors/edit/'}
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
    setSize(5);
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

      <ActionBar title='Tutor List'>
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
          <Link href='/admin/tutors/create'>
            <Button className='button-primary'>Create</Button>
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
        dataSource={tutors}
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
              <strong className=' w-[30%] inline-block'>Tutor</strong>
              <span>
                {details?.firstName} {details?.middleName}
                {details?.lastName}
              </span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Exprience</strong>
              <span>{details?.experience}</span>
            </div>

            <div>
              <strong className=' w-[30%] inline-block'>Location</strong>
              <span>{details?.location}</span>
            </div>

            <div>
              <strong className=' w-[30%] block mb-2'>Bio</strong>
              <span>{details?.bio}</span>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ServicePage;
