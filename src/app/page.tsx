import AccordianFAQ from '@/components/ui/AccordianFaQ';
import Banner from '@/components/ui/Banner';
import BannerInfo from '@/components/ui/BannerInfo';
import Category from '@/components/ui/Category';
import Demo from '@/components/ui/Demo';
import HomeNavbar from '@/components/ui/HomeNavbar';
import Info from '@/components/ui/Info';
import Review from '@/components/ui/Review';
import Services from '@/components/ui/Services';
import Topbar from '@/components/ui/Topbar';
import UpcommingCourse from '@/components/ui/UpcommingCourse';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/AuthOptions';
import Navbar from '@/components/ui/Navbar';
import BackTop from '@/components/ui/BackTop';
import Footer from '@/components/ui/Footer';
import Course from '@/components/ui/Course';
import Choise from '@/components/ui/Choise';
import NedHelp from '@/components/ui/NedHelp';
import About from '@/components/ui/About';
import { Rubik } from 'next/font/google';
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});
const HomePage = async () => {
  const session: any = await getServerSession(authOptions);
  return (
    <div>
      <Navbar session={session} home />
      <Banner />
      <BannerInfo />
      <Demo />
      <Services />
      <Category />
      <Course />
      <UpcommingCourse />
      <Info />
      <Review />
      <AccordianFAQ />
      <BackTop />
      <Choise />
      <NedHelp />
      <About />
      <Footer />
    </div>
  );
};
HomePage.getLayout = (page: React.ReactNode) => page;
export default HomePage;
{
  /* <Banner />
<BannerInfo />
<Demo />
<Services />
<Category />
<Course /> */
}
{
  /* <CourseCity /> */
}
{
  /* <UpcommingCourse />
<Info />
<Review />
<AccordianFAQ />
<BackTop />
<Choise /> */
}
