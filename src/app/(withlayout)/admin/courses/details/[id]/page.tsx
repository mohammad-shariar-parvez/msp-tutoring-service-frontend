'use client';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useCourseQuery } from '@/redux/api/courseApi';

import React from 'react';

const ServiceDetails = ({ params }: any) => {
  const { data, isLoading } = useCourseQuery(params.id);

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: 'admin',
            link: '/admin',
          },
          {
            label: 'courses',
            link: '/admin/courses',
          },
        ]}
      />
      <h1>Course details</h1>
      <h1>{data.title}</h1>
    </div>
  );
};

export default ServiceDetails;
