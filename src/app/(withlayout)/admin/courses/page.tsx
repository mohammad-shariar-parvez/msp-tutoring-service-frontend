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
import HTMLReactParser from 'html-react-parser';

import Image from 'next/image';
import ActionButtons from '@/components/ui/ActionButtons';
import {
  useCoursesQuery,
  useDeleteCourseMutation,
} from '@/redux/api/courseApi';

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [deleteCourse] = useDeleteCourseMutation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['searchTerm'] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = debouncedTerm;
  }
  const { data, isLoading } = useCoursesQuery({ ...query });

  const courses = data?.courses;
  const meta = data?.meta;
  console.log(courses);

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
      title: 'Location',
      dataIndex: 'location',
      sorter: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: function (data: any) {
        return data.title;
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
          <ActionButtons
            data={data}
            onDetailsHandler={onDetailsHandler}
            deleteHandler={deleteHandler}
            editUrl={'/admin/courses/edit/'}
          />
        );
      },
    },
  ];

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      const res = await deleteCourse(id);

      if (res) {
        message.success('Course Deleted successfully');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const onDetailsHandler = (values: any) => {
    setIsModalOpen(true);
    setDetails(values);
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

      <ActionBar title='Course List'>
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
            <Button
              onClick={resetFilters}
              type='primary'
              className='bg-blue-400'
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={courses}
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
                width={200}
                alt='details category '
                className='h-auto'
              />
            ) : (
              <Empty description='Image not available' />
            )}

            <div>
              <strong className=' w-[30%] inline-block'>Title</strong>
              <span>{details?.title}</span>
            </div>

            <div>
              <strong className=' w-[30%] inline-block'>Category</strong>
              <span>{details?.category?.title}</span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Tutor</strong>
              <span>
                {details?.courseTutor?.firstName}{' '}
                {details?.courseTutor?.lastName}
              </span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Location</strong>
              <span>{details?.location}</span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Duration</strong>
              <span>{details?.duration ? details?.duration : 'N/A'}</span>
            </div>
            <div>
              <strong className=' w-[30%] inline-block'>Price</strong>
              <span>{details?.price}</span>
            </div>
            <div>
              <strong className=' w-[30%] block mb-2'>Description</strong>
              <span>{HTMLReactParser(details?.description || '')}</span>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ServicePage;
