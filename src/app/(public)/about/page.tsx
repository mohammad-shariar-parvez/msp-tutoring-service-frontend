import Link from 'next/link';
import React from 'react';

const AboutUs = () => {
  return (
    <section className='container md:my-32'>
      <h1 className='sg-title-txt   '>About Us</h1>

      <div className='text-base font-normal text-[#212529]   m-auto space-y-4 text-justify'>
        <p>
          Study Ground is an interactive education platform for teachers and
          students, who are passionate about education. We have been successful
          in making a tool for them, which encourages learning and career
          advancement flexibly. The registration process is completely free so
          that people in need can access quality education faster. Through this
          attempt, we aim to bring education to the maturity it needs.
        </p>
        <p>
          We have made a specialised learning environment to make education
          interesting and empowering. Yes, we would focus on the word empowering
          because Study Ground will allow you to learn while you earn and vice
          versa. On this website, you can find teachers of all subjects and
          courses. You gain the facility of choosing exactly what you want to
          learn. If you are searching for a teacher with the words
          <span className=' font-semibold'> private home tutors near me</span>,
          then you can be sure that you will get qualified and licensed
          educators here, who will fit your needs accurately.
        </p>
        <p>
          There is a popular saying:
          <span className=' font-semibold'>
            {' '}
            A Knife can finish a life or save it
          </span>
          . Similarly, the digital medium can be used for good or evil. We would
          like to stick to the side of good by educating modern pupils. We aim
          to makethem more conscious by turning them more informed. The best way
          to do that is to bring digital platforms and education even closer to
          each other.
        </p>
        <p>
          If you need the{' '}
          <Link
            className='no-underline text-blue-600 font-semibold'
            href='https://msp-tutoring-service.vercel.app'
          >
            best home tutors in Natore and Gazipur city
          </Link>{' '}
          , then Study Ground can definitely help you. Find out about the
          courses we offer and join our classes to understand the practical
          meaning of these words you have just read. We can assure you of
          academic improvement after the completion of any course from here.
        </p>
        <p>
          Find the{' '}
          <Link
            className='no-underline text-blue-600 font-semibold'
            href='https://msp-tutoring-service.vercel.app'
          >
            best online private tutors in those cities
          </Link>{' '}
          and start learning in Study Ground to fulfil your dreams.
        </p>
        <p>Make a difference…a good one!</p>
      </div>
    </section>
  );
};

export default AboutUs;
