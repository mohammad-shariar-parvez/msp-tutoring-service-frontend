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
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from '@/redux/api/category';
import Image from 'next/image';
import ActionButtons from '@/components/ui/ActionButtons';

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
          <ActionButtons
            data={data}
            onDetailsHandler={onDetailsHandler}
            deleteHandler={deleteHandler}
            editUrl={'/admin/categories/edit/'}
          />
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
      const res = await deleteCategory(id);
      //@ts-ignore
      if (res?.error) {
        message.error('Delete Failed');
      } else {
        message.success('Course Deleted successfully');
      }
    } catch (err: any) {
      message.error(err?.data?.message || 'Something went wrong');
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
    setSize(5);
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
          className='w-64'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <div className='flex space-x-1 '>
          <Link href='/admin/categories/create'>
            <Button className='block bg-secondary     text-white '>
              Create
            </Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              onClick={resetFilters}
              type='primary'
              className=' bg-sky-400'
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
                width={150}
                alt='details category'
                className='h-auto'
              />
            ) : (
              <Empty description='Image not available' />
            )}

            <div>
              <strong className=' w-[30%] inline-block'>Title</strong>
              <span>{details?.title}</span>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default CategoryPage;
