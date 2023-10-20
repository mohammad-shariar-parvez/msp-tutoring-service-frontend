import React from 'react';
import { Col, Input, Row } from 'antd';
import Image from 'next/image';
import a from '../../assets/aplus.jpg';
const Services = () => {
  return (
    <div className='bg-lotion pb-24 pt-8'>
      <div className='container'>
        <div>
          <div className='text-primary  heading text-center mb-[70px]'>
            <div className='mantine-Text-root text-4xl mantine-1lq8d0z mb-14'>
              Get personalised help with
            </div>
            <div className='grid grid-cols-1  md:grid-cols-3  gap-10 '>
              <div className='personaliseCard  grid justify-center items-center py-10 relative overflow-hidden'>
                <div className='absolute left-0 top-0 w-[15px] h-full overflow-hidden stylish-bar'></div>
                <div className='text-center w-11/12 ml-8'>
                  <Image
                    src={a}
                    width={80}
                    alt='eagle_image'
                    className='mx-auto  object-contain '
                  />
                  <h1 className='text-center font-semibold mb-6 mt-3 text-2xl'>
                    Assignment Help
                  </h1>
                  <p className='text-left '>
                    Forget your deadlines and let us help you do the work!
                  </p>
                </div>
              </div>
              <div className='personaliseCard  grid justify-center items-center py-10 relative overflow-hidden'>
                <div className='absolute left-0 top-0 w-[15px] h-full overflow-hidden stylish-bar'></div>
                <div className='text-center w-11/12 ml-8'>
                  <Image
                    src={a}
                    width={80}
                    alt='eagle_image'
                    className='mx-auto  object-contain '
                  />
                  <h1 className='text-center font-semibold mb-6 mt-3 text-2xl'>
                    Assignment Help
                  </h1>
                  <p className='text-left '>
                    Forget your deadlines and let us help you do the work!
                  </p>
                </div>
              </div>
              <div className='personaliseCard  grid justify-center items-center py-10 relative overflow-hidden'>
                <div className='absolute left-0 top-0 w-[15px] h-full overflow-hidden stylish-bar'></div>
                <div className='text-center w-11/12 ml-8'>
                  <Image
                    src={a}
                    width={80}
                    alt='eagle_image'
                    className='mx-auto  object-contain '
                  />
                  <h1 className='text-center font-semibold mb-6 mt-3 text-2xl'>
                    Assignment Help
                  </h1>
                  <p className='text-left '>
                    Forget your deadlines and let us help you do the work!
                  </p>
                </div>
              </div>
              <div className='personaliseCard  grid justify-center items-center py-10 relative overflow-hidden'>
                <div className='absolute left-0 top-0 w-[15px] h-full overflow-hidden stylish-bar'></div>
                <div className='text-center w-11/12 ml-8'>
                  <Image
                    src={a}
                    width={80}
                    alt='eagle_image'
                    className='mx-auto  object-contain '
                  />
                  <h1 className='text-center font-semibold mb-6 mt-3 text-2xl'>
                    Assignment Help
                  </h1>
                  <p className='text-left '>
                    Forget your deadlines and let us help you do the work!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
