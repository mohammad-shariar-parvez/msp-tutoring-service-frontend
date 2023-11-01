'use client';
import AccordianFAQ from '@/components/ui/AccordianFaQ';
import Banner from '@/components/ui/Banner';
import BannerInfo from '@/components/ui/BannerInfo';
import Category from '@/components/ui/Category';
import Demo from '@/components/ui/Demo';
import Footer from '@/components/ui/Footer';
import Info from '@/components/ui/Info';
import Navbar from '@/components/ui/Navbar';
import Review from '@/components/ui/Review';
import Services from '@/components/ui/Services';
import { redirect } from 'next/navigation';

const HomePage = () => {
  // return redirect("/profile");
  return (
    <div>
      <Navbar />
      <Banner />
      <BannerInfo />
      <Demo />
      <Services />
      <Category />
      <Info />
      <Review />
      <AccordianFAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
