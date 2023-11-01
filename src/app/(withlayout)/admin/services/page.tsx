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
import Link from 'next/link';
import { useState } from 'react';
import ActionBar from '@/components/ui/ActionBar';
import { useDebounced } from '@/redux/hooks';
import dayjs from 'dayjs';
import {
  useDeleteServiceMutation,
  useServicesQuery,
} from '@/redux/api/serviceApi';
import Image from 'next/image';

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [deleteCourse] = useDeleteServiceMutation();

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
  const { data, isLoading } = useServicesQuery({ ...query });

  const courses = data?.services;
  const meta = data?.meta;
  // console.log(courses);

  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      const res = await deleteCourse(id);
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
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
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
      dataIndex: 'service',
      render: function (data: any) {
        return data.title;
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
          <>
            <Button onClick={() => onDetailsHandler(data)} type='primary'>
              <EyeOutlined />
            </Button>
            <Link href={`/admin/services/edit/${data?.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                type='primary'
              >
                <EditOutlined />
              </Button>
            </Link>
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

      <ActionBar title='Course List'>
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
          <Link href='/admin/services/create'>
            <Button type='primary'>Create</Button>
          </Link>
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
        dataSource={courses}
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
          title='Category Details'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className='flex flex-col gap-4 divide-y'>
            <Image
              src={details.imageUrl}
              height={100}
              width={100}
              alt='details category'
            />

            <h1 className='font-semibold text-lg'>{details?.title}</h1>
            <div className='flex items-center'>
              <h1 className='font-medium text-base mr-auto'>Service</h1>

              <h1 className='font-normal text-base '>
                {details?.service?.title}
              </h1>
            </div>
            <div className='flex items-center'>
              <h1 className='font-medium text-base mr-auto'>Tutor</h1>

              <h1 className='font-normal text-base '>
                {details?.courseTutor?.firstName}
                {details?.courseTutor?.lastName}
              </h1>
            </div>
            <h1 className='font-normal text-base'>{details?.location}</h1>
            <h1 className='font-normal text-base'>{details?.duration}</h1>
            <h1 className='font-normal text-base'>{details?.price}</h1>
            <h1 className='font-light text-sm pt-2'>{details?.description}</h1>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ServicePage;
