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
import { useDeleteTutorMutation, useTutorsQuery } from '@/redux/api/tutorApi';

const ServicePage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
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
      title: 'First Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
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
          <>
            <Button onClick={() => onDetailsHandler(data)} type='primary'>
              <EyeOutlined />
            </Button>
            <Link href={`/admin/tutors/edit/${data?.id}`}>
              <Button
                style={{
                  margin: '0px 5px',
                }}
                onClick={() => console.log(data)}
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
          <Link href='/admin/tutors/create'>
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
        dataSource={tutors}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <>
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

            <div className='flex items-center space-x-2'>
              <h1 className='font-semibold text-lg'>{details?.firstName}</h1>
              <h1 className='font-semibold text-lg'>{details?.middleName}</h1>
              <h1 className='font-semibold text-lg'>{details?.lastName}</h1>
            </div>
            <div className='flex items-center'>
              <h1 className='font-medium text-base mr-auto'>Exprience</h1>

              <h1 className='font-normal text-base '>{details?.experience}</h1>
            </div>
            <h1 className='font-light text-sm pt-2'>{details?.bio}</h1>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default ServicePage;
