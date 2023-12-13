import Image from 'next/image';
import React from 'react';
import newsLetter from '../../assets/newsletter.png';
import newsLetterMobile from '../../assets/newsletter-mobile.png';

import Link from 'next/link';

const NedHelp = () => {
  return (
    <section className='container  md:h-96 justify-center items-center  mb-44 md:mb-32'>
      <div className='mix-blend-overlay hidden md:block'>
        <Image
          src={newsLetter}
          fill
          alt='how_it_works'
          className='  h-auto   p-4    '
        />
      </div>
      <div className='mix-blend-overlay block md:hidden    '>
        <Image
          src={newsLetterMobile}
          fill
          alt='how_it_works'
          className='rounded-t-lg  h-36   object-cover object-center p-4  '
        />
      </div>
      <div className=' relative top-10 md:top-[44%] flex items-center justify-center flex-col md:flex-row w-full md:space-x-10  space-y-2 md:space-y-0  '>
        <h1 className='text-[21px] md:text-[40px] font-semibold text-[#333]'>
          Do you need <span className=' '>help ?</span>
        </h1>
        <Link href='/contact' className='  block'>
          <button className='px-2 py-2 md:px-6 md:py-3 rounded-[25px] ring-4 md:ring-[10px] ring-white bg-[#2639ed] text-white text-sm font-semibold border-none  md:text-[17px] cursor-pointer '>
            Contact Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NedHelp;

// import Image from 'next/image';
// import React from 'react';
// import newsLetter from '../../assets/newsletter.png';
// import newsLetterMobile from '../../assets/newsletter-mobile.png';
// import Link from 'next/link';

// const NedHelp = () => {
//   return (
//     <section className='container relative h-64 md:h-96  justify-center items-center '>
//       <div className='mix-blend-overlay hidden md:block'>
//         <Image
//           src={newsLetter}
//           fill
//           alt='how_it_works'
//           className='  h-auto      '
//         />
//       </div>
//       <div className='mix-blend-overlay block md:hidden   '>
//         <Image
//           src={newsLetterMobile}
//           fill
//           alt='how_it_works'
//           className='rounded-t-lg  h-auto   object-cover object-center p-4  '
//         />
//       </div>
//       <div className=' absolute top-11 md:top-[42%] flex items-center justify-center w-full overflow-x-auto flex-col md:flex-row mx-auto text-sm md:text-3xl space-y-2 md:space-y-0  '>
//         <h1>Do you need help ?</h1>
//         <Link href={'www.google.com'} className='  block'>
//           <button className=' md:px-6 md:py-3 rounded-[25px] ring-4 md:ring-[12px] ring-white bg-[#2639ed] text-white font-bold md:font-extrabold border-none md:text-lg cursor-pointer mx-20'>
//             Contact
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default NedHelp;
