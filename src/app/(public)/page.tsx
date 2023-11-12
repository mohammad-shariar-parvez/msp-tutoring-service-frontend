'use client';
import AccordianFAQ from '@/components/ui/AccordianFaQ';
import Banner from '@/components/ui/Banner';
import BannerInfo from '@/components/ui/BannerInfo';
import Category from '@/components/ui/Category';
import Demo from '@/components/ui/Demo';
import Info from '@/components/ui/Info';
import Review from '@/components/ui/Review';
import Services from '@/components/ui/Services';
import UpcommingCourse from '@/components/ui/UpcommingCourse';

const HomePage = () => {
  return (
    // <PublicContents>
    <div>
      <Banner />
      <BannerInfo />
      <Demo />
      <Services />
      <Category />
      {/* <CourseCity /> */}
      <UpcommingCourse />
      <Info />
      <Review />
      <AccordianFAQ />
    </div>
    // </PublicContents>
  );
};

export default HomePage;
