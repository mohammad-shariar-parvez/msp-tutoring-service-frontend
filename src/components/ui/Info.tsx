import React from 'react';
import Image from 'next/image';
import purple from '../../assets/08a51d11977fe8e0.png';
const Info = () => {
  return (
    <div>
      <div className='bg-[#fbfeff]  py-16 mb-32  '>
        <div className='container'>
          <div className='sub-title sub-title-style-2 text-center  '>
            Get our help in 4 easy steps!
          </div>
          <p className='text-secondary py-4 text-center font-semibold text-xl mb-10 tracking-wide '>
            Get the best expert help available 24/7 with 100% accuracy
          </p>{' '}
          <div className='grid  mx-auto md:grid-cols-4 gap-6 place-items-center '>
            <div className='  px-8 pt-6 pb-10  max-w-96 md:w-auto md:h-56  max-w-sm  bg-white  rounded-lg       shadow-md shadow-blue-100 '>
              <div className='text-hint font-medium text-lg  text-primary'>
                Step 1
              </div>
              <h2 className='  text-center my-6 text-xl font-semibold  text-secondary'>
                Sign up
              </h2>
              <p className='ext-base font-normal  text-gray-600 text-center '>
                Fill up your details and complete the sign-up process.
              </p>
            </div>
            <div className='bg-white  px-8 pt-6 pb-10  max-w-96 md:w-auto md:h-56  max-w-sm    rounded-lg     shadow-md shadow-blue-100 '>
              <div className='text-hint font-medium text-lg  text-primary'>
                Step 2
              </div>
              <h2 className='text-center my-6 text-xl font-semibold  text-secondary'>
                Place your order
              </h2>
              <p className='ext-base font-normal  text-gray-600 text-center '>
                Place your order by uploading your queries and wait for a
                quotation.
              </p>
            </div>
            <div className='  px-8 pt-6 pb-10  max-w-96 md:w-auto md:h-56  max-w-sm  bg-white  rounded-lg      shadow-md shadow-blue-100 '>
              <div className='text-hint font-medium text-lg  text-primary'>
                Step 3
              </div>
              <h2 className='text-center my-6 text-xl font-semibold  text-secondary'>
                Payment
              </h2>
              <p className='ext-base font-normal  text-gray-600 text-center '>
                We will quote a price depending on your order. Pay with the
                link.
              </p>
            </div>
            <div className='  px-8 pt-6 pb-10  max-w-96 md:w-auto md:h-56  max-w-sm  bg-white  rounded-lg       shadow-md shadow-blue-100 '>
              <div className='text-hint font-medium text-lg text-primary'>
                Step 4
              </div>
              <h2 className='text-center my-6 text-xl font-semibold  text-secondary'>
                Get your solutions
              </h2>
              <p className='text-base font-normal  text-gray-600 text-center '>
                Once payment is completed, you can sit back and relax.
              </p>
            </div>
          </div>
          <div className=' mt-12 flex justify-center items-center '>
            <button
              className='mantine-UnstyledButton-root mantine-Button-root bg-primary font-semibold text-base mantine-fe01i9'
              type='button'
              data-button='true'
            >
              {/* <div className='mantine-3xbgk5 mantine-Button-inner'>
                <span className='mantine-qo1k2 mantine-Button-label'>
                  Get Service Now
                </span>
              </div> */}
            </button>
          </div>
        </div>
      </div>
      {/* -------------------------- */}

      <div className=' mb-32 bg-gradient-to-r from-primary to-darkGreen'>
        <div className='text-white text-4xl font-medium leading-relaxed  mx-auto md:my-10 my-5 text-center py-8 px-4  '>
          95% students get better grades when they study with us.
        </div>
      </div>
    </div>
  );
};

export default Info;

// <div className='bg-lightSkyBlue relative mb-32 '>
//   {/* <div className='overflow-hidden h-64 '>
//     <Image
//       src={purple}
//       fill
//       alt='eagle_image'
//       className='rounded-[30px]'
//     />
//   </div> */}
//   <div className='   absolute top-0 left-0 right-0  '>
//     <div className='p-8 max-w-[1440px] mx-auto'>
//       <div className='text-white text-4xl font-medium leading-relaxed md:w-3/5 mx-auto md:my-10 my-5 text-center   '>
//         95% students get better grades when they study with us.
//       </div>
//     </div>
//   </div>
// </div>;
