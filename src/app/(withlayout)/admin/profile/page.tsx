'use client';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddProfileMutation, useProfileQuery } from '@/redux/api/profile';
import { Col, Row, Card, Button } from 'antd';
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
            {data?.profile?.profileImage && (
              <Image
                src={data?.profile?.profileImage}
                width={500}
                height={500}
                alt='eagle_image'
              />
            )}
          </Col>
          <Col xs={24} md={24} lg={16}>
            <Card title='Name' style={{ margin: '10px 5px' }}>
              <Row justify='space-around'>
                <div>{data?.profile?.firstName}</div>
                <div>{data?.profile?.middleName}</div>
                <div>{data?.profile?.lastName}</div>
              </Row>
            </Card>

            <Card title='Email' bordered={false} style={{ margin: '10px 5px' }}>
              <Row justify='space-between'>
                <div>{data?.profile?.useEmail}</div>
                <div>ID: {data?.profile?.id}</div>
              </Row>
            </Card>
            <Card title='Role' bordered={false} style={{ margin: '10px 5px' }}>
              {data?.profile?.role}
            </Card>

            <Card
              title='Contact Info'
              bordered={false}
              style={{ margin: '10px 5px' }}
            >
              {data?.profile?.contactNo}
            </Card>
            <Card style={{ margin: '10px 5px' }}>{data?.profile?.bio}</Card>
            <Row justify='space-between'>
              <Link href={`/profile/edit/`}>
                <Button type='primary'> Update Profile</Button>
              </Link>
            </Row>
          </Col>
          <div></div>
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;
