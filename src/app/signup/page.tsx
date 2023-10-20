import SignUpPage from '@/components/SignUp/SignUp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'msp tutoring | Login',
};

const SignUp = () => {
  return (
    <>
      <SignUpPage />
    </>
  );
};

export default SignUp;
