import Image from 'next/image';
import React from 'react';
import about from '../../assets/about-us.webp';
import { Button, Col, Row } from 'antd';
import Link from 'next/link';
const About = () => {
  return (
    <section className='container pb-32 my-0'>
      <h1 className='sub-title sub-title-style mb-20 text-center mt-0  '>
        About Us
      </h1>

      <div className='flex   flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0'>
        <Image
          src={about}
          width={360}
          height={314}
          alt='how_it_works'
          className='  md:w-[360px]  md:h-[314px] w-full h-full  '
        />
        <div className='text-base font-normal text-[#212529]   m-auto space-y-4 text-justify'>
          <p>
            Study Ground is an interactive education platform for teachers and
            students, who are passionate about education. We have been
            successful in making a tool for them, which encourages learning and
            career advancement flexibly. The registration process is completely
            free so that people in need can access quality education faster.
            Through this attempt, we aim to bring education to the maturity it
            needs.
          </p>
          <p>
            We have made a specialised learning environment to make education
            interesting and empowering. Yes, we would focus on the word
            empowering because Study Ground will allow you to learn while you
            earn and vice versa. On this website, you can find teachers of all
            subjects and courses. You gain the facility of choosing exactly what
            you want to learn. If you are searching for a teacher with the words
            <strong> private home tutors near me</strong>, then you can be sure
            that you will get qualified and licensed educators here, who will
            fit your needs accurately.
          </p>

          <div className='pt-4'>
            <Link href='/about' className='no-underline'>
              <Button
                size='large'
                className='  bg-secondary  text-white roun rounded-full text-base font-medium '
              >
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
