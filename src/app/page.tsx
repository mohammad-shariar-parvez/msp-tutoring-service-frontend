'use client';
import AccordianFAQ from '@/components/ui/AccordianFaQ';
import Banner from '@/components/ui/Banner';
import BannerInfo from '@/components/ui/BannerInfo';
import Category from '@/components/ui/Category';
import Demo from '@/components/ui/Demo';
import Footer from '@/components/ui/Footer';
import Info from '@/components/ui/Info';
import Navbar from '@/components/ui/Navbar';
import PublicContents from '@/components/ui/PublicContents';
import Review from '@/components/ui/Review';
import Services from '@/components/ui/Services';
import UpcommingCourse from '@/components/ui/UpcommingCourse';
import { redirect } from 'next/navigation';

const HomePage = () => {
  // return redirect("/profile");

  return (
    <PublicContents>
      <div>
        <Banner />
        <BannerInfo />
        <Demo />
        <Services />
        <Category />
        <UpcommingCourse />
        <Info />
        <Review />
        <AccordianFAQ />
      </div>
    </PublicContents>
  );
};

export default HomePage;
