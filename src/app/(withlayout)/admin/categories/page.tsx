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
import {
  useAddCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '@/redux/api/category';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import Image from 'next/image';

const CategoryPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [details, setDetails] = useState<any>({});

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
  const { data, isLoading } = useCategoriesQuery({ ...query });

  const courses = data?.categories;
  const meta = data?.meta;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,

      // ellipsis: true,
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
          <div className='flex '>
            <Button onClick={() => onDetailsHandler(data)} type='primary'>
              <EyeOutlined />
            </Button>

            <Link href={`/admin/categories/edit/${data?.id}`}>
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
          </div>
        );
      },
    },
  ];
  const onDetailsHandler = (values: any) => {
    setIsModalOpen(true);
    setDetails(values);
  };
  const deleteHandler = async (id: string) => {
    message.loading('Deleting.....');
    try {
      //   console.log(data);
      const res = await deleteCategory(id);
      if (res) {
        message.success('Course Deleted successfully');
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const addServiceHandler = async (values: any) => {
    // try {
    //   const res = await updateCategory({
    //     id: rowData?.id,
    //     body: values,
    //   });
    //   if (res) {
    //     message.success('Booking updated successfully');
    //   }
    // } catch (err: any) {
    // 	message.error(err.message);
    // }
    setIsModalOpen(false);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
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
  /* 
-------------- START-----------------------------------

*/

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

      <ActionBar title='Category List'>
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
          <Link href='/admin/categories/create'>
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
        <Modal
          title='Category Details'
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div>{details?.title}</div>
          <Image
            src={details.imageUrl}
            height={200}
            width={200}
            alt='details category'
          />
        </Modal>
      </>
    </div>
  );
};

export default CategoryPage;
