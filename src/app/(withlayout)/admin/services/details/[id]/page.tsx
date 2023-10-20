'use client';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useServiceQuery, useServicesQuery } from '@/redux/api/serviceApi';
import React from 'react';

const ServiceDetails = ({ params }: any) => {
  const { data, isLoading } = useServiceQuery(params.id);

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'admin',
            link: '/admin',
          },
          {
            label: 'services',
            link: '/admin/services',
          },
        ]}
      />
      <h1>Service details</h1>
      <h1>{data.title}</h1>
    </div>
  );
};

export default ServiceDetails;
