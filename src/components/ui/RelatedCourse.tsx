import { useCoursesQuery } from '@/redux/api/courseApi';
import { ICourse } from '@/types';
import React from 'react';
import CourseCard from './CourseCard';
import { Empty } from 'antd';
import Link from 'next/link';
import CourseCardScalaton from './scalaton/CourseCardScalaton';

interface RelatedCourseProps {
  categoryId: string;
  location: string;
}
const RelatedCourse: React.FC<RelatedCourseProps> = ({
  categoryId,
  location,
}) => {
  const { data, isLoading, isError } = useCoursesQuery({
    limit: 4,
    categoryId,
    location,
  });
  const coursesData: ICourse[] = (data?.courses || []) as ICourse[];
  //   console.log(coursesData);

  let searchComponent = null;

  if (!isLoading && isError) {
    searchComponent = (
      <div className=' flex justify-center items-center h-full'>
        <Empty
          className='text-red-500   block'
          description='Something went wrong'
        />
      </div>
    );
  }
  if (!isError && !isLoading && coursesData?.length <= 0) {
    searchComponent = <Empty description='No courses found' />;
  }
  if (isLoading && !isError) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {Array.from({ length: 4 }).map((_, index) => (
          <CourseCardScalaton key={index} />
        ))}
      </div>
    );
  }

  if (!isError && !isLoading && coursesData?.length > 0) {
    searchComponent = (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {coursesData?.map((course: ICourse) => (
          <CourseCard key={course.id} course={course} isLoading={isLoading} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className='col-span-3 py-4'>
        <h1 className='mb-6  mt-3  text-3xl text-secondary   font-medium  '>
          Related course
        </h1>

        {searchComponent}
        {/* {coursesData?.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
            {coursesData?.map((course: ICourse) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <Empty description='No courses found' />
        )} */}
        <Link
          href={`/categories/${categoryId}`}
          className='flex justify-end pt-12 no-underline text-blue-500 text-base font-medium '
        >
          More....
        </Link>
      </div>
    </div>
  );
};

export default RelatedCourse;
