import React from 'react';
import { Col, Input, Row } from 'antd';
import Image from 'next/image';
import assignment from '../../assets/aplus.jpg';
import live from '../../assets/live.jpg';
import chem from '../../assets/chem.jpg';
import project from '../../assets/project.jpg';
import hw from '../../assets/hw.jpg';
import exam from '../../assets/exam.jpg';
import weektest from '../../assets/weektest.jpg';
import ServiceCard from './ServiceCard';
const Services = () => {
  return (
    <div className='bg-lotion pb-32'>
      <div className='container'>
        <div>
          <div className='  text-center '>
            <h1 className='sub-title sub-title-style-2 '>
              Get personalised help with
            </h1>

            <div className='grid grid-cols-1  md:grid-cols-3  gap-8  '>
              <ServiceCard
                title=' Assignment Help'
                description='Forget your deadlines and let us help you do the work!'
                imageSrc={assignment.src}
                colorClass='stylish-bar1'
              />
              <ServiceCard
                title=' Live Session Help'
                description='Take live help from experts who can help you with the most complex problems with step by step solutions'
                imageSrc={live.src}
                colorClass='stylish-bar2'
              />
              <ServiceCard
                title=' Projects Report Writing Help'
                description='Get the best Project help available online and impress the whole class!'
                imageSrc={project.src}
                colorClass='stylish-bar4'
              />
              <ServiceCard
                title=' Homework'
                description='Homework done fast and right with the help of amazing experts!'
                imageSrc={hw.src}
                colorClass='stylish-bar3'
              />
              <ServiceCard
                title=' Exam preparation '
                description='Get ready for test day with the help of our highly qualified experts who can teach the hardest of problems!'
                imageSrc={exam.src}
                colorClass='stylish-bar5'
              />
              <ServiceCard
                title=' Essay'
                description='Write the best Essay in your class with the help of Edufeat’s Essay Writing help!'
                imageSrc={weektest.src}
                colorClass='stylish-bar6'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
