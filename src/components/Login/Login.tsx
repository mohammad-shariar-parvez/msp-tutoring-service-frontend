'use client';
import { Button, Col, Divider, Input, Row, message } from 'antd';
import loginImage from '../../assets/login.png';
import Image from 'next/image';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import { useUserLoginMutation } from '@/redux/api/authApi';
import { getUserInfo, storeUserInfo } from '@/services/auth.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/login';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const callbackUrl = useSearchParams().get('callbackUrl') as string;
  const [call, setCall] = useState(callbackUrl);

  const [
    userLogin,
    { data, error: responseError, isSuccess, isError, isLoading },
  ] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();

      if (res?.accessToken) {
        if (!call && res.role == 'admin') {
          router.push('/admin');
        } else if (!call && res.role == 'super_admin') {
          router.push('/super_admin');
        } else if (!call && res.role == 'user') {
          router.push('/');
        } else {
          router.push(call);
        }

        message.success('User logged in successfully!');
        console.log(res);
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      message.error(err?.data?.message || 'Network Error');
    }
  };

  // const githubHandler = () => {
  //   signIn('github', {
  //     callbackUrl: callbackUrl || 'https://msp-pc-builder.vercel.app/',
  //   });
  //   // sessionStorage.removeItem('previousPage');
  // };

  return (
    <section className='container  flex justify-center items-center h-screen '>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
        <Image
          src={loginImage}
          width={500}
          alt='login image'
          className='hidden md:block max-h-full'
        />

        <div className='mt-8'>
          <h1 className='text-4xl font-medium mb-5'>Join in MSP Toring</h1>
          <h2 className='text-left mb-4'>
            <span className='text-lg text-slate-600 font-normal  '>
              Study with MSP Tutoring and grow your skills{' '}
              <Divider type='vertical' />
              <Link
                className='no-underline  font-semibold hover:underline hover:decoration-2 text-blue-600'
                href='/signup'
              >
                Sign up
              </Link>
            </span>
          </h2>

          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
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

            <Button
              htmlType='submit'
              size='large'
              className=' block bg-[#274279] mt-8    text-white    rounded-md  px-6 '
            >
              Login
            </Button>
          </Form>

          {/* <Divider className='mt-6 font-medium text-lg' plain>
            or
          </Divider>
          <div className='flex justify-center'>
            <GithubOutlined className='text-3xl' onClick={githubHandler} />
          </div> */}
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
      {/* <div>
        <GoogleOutlined
          onClick={() =>
            signIn('google', {
              callbackUrl:
                sessionStorage.getItem('previousPage') ||
                'https://msp-pc-builder.vercel.app/',
            })
          }
        />
      </div> */}
    </section>
  );
};

export default LoginPage;
