'use client';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddProfileMutation, useProfileQuery } from '@/redux/api/profile';
import { Col, Row, Card, Button, Empty } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const ProfilePage = () => {
  const [addProfile] = useAddProfileMutation();
  const { data } = useProfileQuery(undefined);

  useEffect(() => {
    addProfile(undefined);
  }, [addProfile]);

  return (
    <div>
      <div className=' '>
        <UMBreadCrumb
          items={[
            {
              label: 'admin',
              link: '/user',
            },
          ]}
        />

        <div className=' md:max-w-2xl mt-4  mx-auto '>
          <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 text-base font-normal '>
            <div className=''>
              {data?.profile?.profileImage ? (
                <Image
                  src={data?.profile?.profileImage}
                  width={200}
                  height={300}
                  alt='eagle_image'
                  className=' rounded-md w-full h-auto object-cover object-center  '
                />
              ) : (
                <Empty
                  description='Profile image not updated '
                  className='text-base font-normal'
                />
              )}
            </div>

            <div className='bg-white p-4 grow rounded-md '>
              <div className='pb-4  '>
                <span className='w-[30%] inline-block font-medium'>Name</span>
                <span>
                  {data?.profile?.firstName} {data?.profile?.middleName}
                  {data?.profile?.lastName}
                </span>
              </div>
              <div className='pb-4 '>
                <span className='w-[30%] inline-block font-medium'>Email</span>
                <span>{data?.profile?.useEmail}</span>
              </div>
              <div className='pb-4'>
                <span className='w-[30%] inline-block font-medium'>Role</span>
                <span>{data?.profile?.role}</span>
              </div>
              <div className='pb-4'>
                <span className='w-[30%] inline-block font-medium'>
                  Contact
                </span>
                <span>{data?.profile?.contactNo}</span>
              </div>
              <div>
                <span className='block mb-2 font-medium'>Bio</span>
                <p>{data?.profile?.bio}</p>
              </div>
            </div>
          </div>
          <div className='flex  justify-end mt-4'>
            <Link href='/user/profile/edit/'>
              <Button className=' bg-secondary     text-white '>
                Update Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
