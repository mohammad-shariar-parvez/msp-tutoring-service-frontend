import Image from 'next/image';
import React from 'react';

interface CustomCardProps {
  imageSrc: string;
  title: string;
  description: string;
  colorClass: string;
}

const ServiceCard: React.FC<CustomCardProps> = ({
  imageSrc,
  title,
  description,
  colorClass,
}) => {
  return (
    <div className='  justify-center items-center  relative overflow-hidden  p-4 py-10  rounded-lg  shadow-lg shadow-blue-100 border-2'>
      <div
        className={`absolute left-0 top-0 w-[10px] h-full  ${colorClass}`}
      ></div>
      <div className='ms-1'>
        <Image
          src={imageSrc}
          width={100}
          height={100}
          alt='eagle_image'
          className='mx-auto object-contain  '
        />
        <h5 className=' text-xl font-semibold  text-secondary mb-6 mt-3 '>
          {title}
        </h5>

        <p className=' text-base font-normal  text-gray-600 '>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
