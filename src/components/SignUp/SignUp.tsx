'use client';
import { Button, Col, Divider, Input, Row, message } from 'antd';
import loginImage from '../../assets/login.png';
import Image from 'next/image';
import Form from '@/components/Forms/Form';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import FormInput from '@/components/Forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import {
  useUserLoginMutation,
  useUserSignUpMutation,
} from '@/redux/api/authApi';
import { storeUserInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/schemas/signUp';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

type FormValues = {
  id: string;
  password: string;
};

const SignUpPage = () => {
  const [userSignUp] = useUserSignUpMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const { confirmPassword, ...dataToSend } = data;
      const res = await userSignUp({ ...dataToSend }).unwrap();

      if (res?.accessToken) {
        router.push('/');
        message.success('User Created  successfully!');
      }
      storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <section className='container  flex justify-center items-center h-screen '>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
        <Image
          src={loginImage}
          width={500}
          alt='login image'
          className='hidden md:block'
        />

        <div className='mt-8'>
          <h1 className='text-4xl font-medium mb-5'>Join in MSP Toring</h1>
          <h2 className='text-left mb-4'>
            <span className='text-lg text-slate-600 font-normal  '>
              Study with MSP Tutoring and grow your skills{' '}
              <Divider type='vertical' />
              <Link
                className='no-underline  font-semibold hover:underline hover:decoration-2 text-blue-600'
                href='/login'
              >
                Log in
              </Link>
            </span>
          </h2>

          <Form submitHandler={onSubmit} resolver={yupResolver(signUpSchema)}>
            <div className='mb-4 space-y-2 '>
              <label className='font-bold text-base text-[#565656] mb-4'>
                Email
              </label>
              <FormInput name='email' type='email' size='large' required />
            </div>
            <div className='mb-4 space-y-2 '>
              <label className='font-bold text-base text-[#565656] mb-4'>
                Password
              </label>

              <FormInput
                name='password'
                type='password'
                size='large'
                required
              />
            </div>
            <div className='mb-4 space-y-2 '>
              <label className='font-bold text-base text-[#565656] mb-4'>
                Password
              </label>
              <FormInput
                name='confirmPassword'
                type='password'
                size='large'
                required
              />
            </div>

            <Button
              htmlType='submit'
              size='large'
              className=' block bg-[#274279] mt-8    text-white    rounded-md  px-6 '
            >
              Signup
            </Button>
          </Form>

          <Divider className='mt-6 font-medium text-lg' plain>
            or
          </Divider>
          <div className='flex justify-center'>
            <GithubOutlined
              className='text-3xl'
              onClick={() => signIn('github')}
            />
          </div>
        </div>
      </div>

      {/* <div>
        <h1
          style={{
            margin: '15px 0px',
          }}
        >
          First login your account
        </h1>
        <div>
          
        </div>
      </div> */}
      <div>
        {/* <GoogleOutlined
          onClick={() =>
            signIn('google', {
              callbackUrl:
                router.query.callbackUrl ||
                'https://msp-pc-builder.vercel.app/',
            })
          }
        /> */}
      </div>
    </section>
  );
};

export default SignUpPage;
