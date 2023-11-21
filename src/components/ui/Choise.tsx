import Image from 'next/image';
import React from 'react';
import how from '../../assets/how.webp';

const Choise = () => {
  return (
    <section className='bg-[#f9f9f9] py-16 mb-32 relative '>
      <div className='container '>
        <h1 className='sub-title sub-title-style mb-20 text-center mt-0  '>
          How it works
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <Image
            src={how}
            width={200}
            height={200}
            alt='how_it_works'
            className='inline-block mx-auto  '
          />
          <ol className='text-base font-normal text-[#212529] p-4 m-auto '>
            <li>
              Our platform is for everyone. Study Ground provide personalized
            </li>
            <li>
              Study Ground provide personalized attention to every requests
            </li>
            <li>
              Here teachers and students or parents can communicate directly..
            </li>
            <li>We always do our best to help everyone.</li>
            <li>Our aim is to build a simple and open education system.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Choise;
