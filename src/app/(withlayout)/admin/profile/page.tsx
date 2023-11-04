'use client';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import VChart from '@/components/ui/VChart';
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
      <UMBreadCrumb
        items={[
          {
            label: 'admin',
            link: '/admin',
          },
        ]}
      />
      <div className='container'>
        <Row>
          <Col xs={24} md={24} lg={8}>
            {data?.profile?.profileImage ? (
              <Image
                src={data?.profile?.profileImage}
                width={500}
                height={500}
                alt='eagle_image'
              />
            ) : (
              <Empty description='Profile image not updated' />
            )}
          </Col>
          <Col xs={24} md={24} lg={16}>
            <Card style={{ margin: '10px 5px' }}>
              <div>
                <Row justify='space-between' className='pb-4'>
                  <strong>Name</strong>
                  <p>
                    {data?.profile?.firstName} {data?.profile?.middleName}
                    {data?.profile?.lastName}
                  </p>
                </Row>
                <Row justify='space-between' className='pb-4'>
                  <strong>Email</strong>
                  <p>{data?.profile?.useEmail}</p>
                </Row>
                <Row justify='space-between' className='pb-4'>
                  <strong>Role</strong>
                  <p>{data?.profile?.role}</p>
                </Row>
                <Row justify='space-between' className='pb-4'>
                  <strong>Contact Info</strong>
                  <p>{data?.profile?.contactNo}</p>
                </Row>
                <Row>
                  <strong>Bio</strong>
                  <p>{data?.profile?.bio}</p>
                </Row>
              </div>
            </Card>

            <Row justify='space-between'>
              <Link href='/admin/profile/edit/'>
                <Button
                  className=' block bg-[#274279] mt-6    text-white   '
                  type='primary'
                >
                  {' '}
                  Update Profile
                </Button>
              </Link>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;
