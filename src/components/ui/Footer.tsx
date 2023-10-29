'use client';

import BgIcons from './BgIcons';
import FooterImage from './FooterImage';

function Footer() {
  return (
    <footer className='bg-footer'>
      <div className='grid grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-4  text-black  container p-4 py-20  '>
        <div className='space-y-6  '>
          <h6 className='text-white text-lg leading-normal font-semibold  '>
            MSP Tutoring
          </h6>

          <div className='space-y-4'>
            <small className='footer-small'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
              alias atque. Corrupti quo
            </small>
            <BgIcons />
          </div>
        </div>

        <div className=' space-y-6'>
          <h6 className='text-white text-lg leading-normal font-semibold '>
            Office Hours
          </h6>

          <div className='space-y-3'>
            <div className='flex justify-between '>
              <small className='footer-small'>Saturday</small>
              <small className='footer-small'>9:00 - 5:00</small>
            </div>
            <div className='flex justify-between'>
              <small className='footer-small'>Sunday</small>
              <small className='footer-small'>9:00 - 5:00</small>
            </div>
            <div className='flex justify-between '>
              <small className='footer-small'>Monday</small>
              <small className='footer-small'>9:00 - 5:00</small>
            </div>
            <div className='flex justify-between '>
              <small className='footer-small'>Tuesday</small>
              <small className='footer-small'>9:00 - 5:00</small>
            </div>
            <div className='flex justify-between '>
              <small className='footer-small'>Wednesday</small>
              <small className='footer-small'>9:00 - 5:00</small>
            </div>
            <div className='flex justify-between'>
              <small className='footer-small'>Thursday</small>
              <small className='footer-small'>9:00 - 5:00</small>
            </div>
          </div>
        </div>
        <div className=' space-y-6'>
          <h6 className='text-white text-lg leading-normal font-semibold '>
            Instagram
          </h6>
          <div className='space-y-1 '>
            <div className='flex flex-col md:flex-row gap-1  '>
              <FooterImage image={'/insta-1.jpg.webp'} />
              <FooterImage image={'/insta-2.jpg.webp'} />
              <FooterImage image={'/insta-3.jpg.webp'} />
            </div>
            <div className='flex flex-row gap-1'>
              <FooterImage image={'/insta-2.jpg.webp'} />
              <FooterImage image={'/insta-3.jpg.webp'} />
              <FooterImage image={'/insta-4.jpg.webp'} />
            </div>
          </div>
        </div>
        <div className=' space-y-6'>
          <h6 className='text-white text-lg leading-normal font-semibold '>
            Newsletter
          </h6>

          <div className='  '>
            <small className='text-[#FFFFFFB3] font-normal'>
              Lorem ipsum dolor, sit amet consectetur adipisicing
            </small>

            <div className='form-group pt-4 space-y-3'>
              <input
                type='text'
                name='mail'
                placeholder='Enter email address'
                className=' w-full p-4 py-3 text-black text-center rounded-sm text-base   focus:outline-none'
                required
              ></input>

              <button className='px-8 py-3  text-center rounded-sm text-base w-full  cursor-pointer hover:bg-slate-300'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <small className='text-center col-span-1 md:col-span-4  md:pt-6 pb-6 md:pb-0  footer-small'>
          Copyright © All rights reserved by
          <span className='pt-1'>
            <i className='bx bxs-heart '> </i>{' '}
          </span>
          MSP Tutoring
        </small>
      </div>
    </footer>
  );
}

export default Footer;
