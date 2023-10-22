import { useCategoriesQuery } from '@/redux/api/category';
import { useServicesByCategoryQuery } from '@/redux/api/serviceApi';
import { ICategory } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';

const CategoryDropdown = () => {
  const query: <string> = '';
  const [serviceId, setServiceId] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);
  query['serviceId'] = serviceId;

  const openMainDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeMainDropdown = () => {
    setIsDropdownOpen(false);
  };

  const OpenNestedToggleDropdown = (id: any) => {
    // setServiceId(serviceId);
    console.log(id);

    setServiceId(id);
    setIsNestedDropdownOpen(true);
  };
  const CloseNestedToggleDropdown = () => {
    setIsNestedDropdownOpen(false);
  };
  console.log(serviceId);

  const { data: categoriesData } = useCategoriesQuery({});
  const { data: serviceData } = useServicesByCategoryQuery({ ...query });

  console.log({ ...query });

  const categories: ICategory[] = (categoriesData?.categories ||
    []) as ICategory[];

  return (
    <>
      <li className='relative'>
        <Link
          onMouseEnter={openMainDropdown}
          onMouseLeave={closeMainDropdown}
          className='text-base  text-black pb-10 inline-flex px-5'
          href={'/services'}
        >
          Dropdown button
        </Link>

        <ul
          onMouseEnter={openMainDropdown}
          onMouseLeave={closeMainDropdown}
          className={`z-10 ${
            isDropdownOpen ? 'block' : 'block'
          }  bg-white  list-none   shadow-lg w-44  text-sm text-gray-700  absolute top-18 left-5  `}
        >
          {categories.map((items) => (
            <li key={items.id} className='relative'>
              <Link
                href='/'
                onMouseEnter={() => OpenNestedToggleDropdown(items?.id)}
                onMouseLeave={CloseNestedToggleDropdown}
                className='   block  px-5 py-2 hover:bg-gray-100 text-black  '
              >
                {items.title}
              </Link>

              <ul
                className={`z-10     text-gray-700  text-sm   shadow-lg w-44 bg-white  absolute left-44 top-0 list-none   `}
              >
                {items?.courses?.map((course: any) => (
                  <li key={items.id}>
                    <Link
                      onMouseEnter={OpenNestedToggleDropdown}
                      onMouseLeave={CloseNestedToggleDropdown}
                      href='#'
                      className={`block px-4 py-2 hover:bg-gray-100 text-black  ${
                        isNestedDropdownOpen ? 'block' : 'block'
                      }`}
                    >
                      {course?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

export default CategoryDropdown;
