import { useCoursesQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import React from 'react';
import CourseCard from './CourseCard';
import { Empty } from 'antd';
import Link from 'next/link';

interface RelatedCourseProps {
  categoryId: string;
  location: string;
}
const RelatedCourse: React.FC<RelatedCourseProps> = ({
  categoryId,
  location,
}) => {
  const { data } = useCoursesQuery({ limit: 4, categoryId, location });
  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];
  console.log(coursesData);

  return (
    <div>
      <div className='col-span-3'>
        {coursesData?.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
            {coursesData?.map((course: ICourse) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Empty description='No courses found' />
        )}
        <Link
          href={`/categories/${categoryId}`}
          className='flex justify-end pt-12 no-underline '
        >
          More....
        </Link>
      </div>
    </div>
  );
};

export default RelatedCourse;
