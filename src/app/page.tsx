import Banner from '@/components/ui/Banner';
import BannerInfo from '@/components/ui/BannerInfo';
import Category from '@/components/ui/Category';
import Demo from '@/components/ui/Demo';
import Info from '@/components/ui/Info';
import Navbar from '@/components/ui/Navbar';
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
    </div>
  );
};

export default HomePage;
