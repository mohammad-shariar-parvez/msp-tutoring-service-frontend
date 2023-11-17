'use client';
import { Button, Col, Divider, Input, Row, message } from 'antd';
import loginImage from '../../assets/login.png';
import Image from 'next/image';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import {
  useOAuthAccessMutation,
  useUserLoginMutation,
} from '@/redux/api/authApi';
import { getUserInfo, storeUserInfo } from '@/services/auth.service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

// import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/login';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searhParams = useSearchParams().get('redirect');
  const { data: session, status } = useSession();
  console.log(searhParams);

  const [
    userLogin,
    { data, error: responseError, isSuccess, isError, isLoading },
  ] = useUserLoginMutation();
  const [oAuthAccess] = useOAuthAccessMutation();

  console.log(session);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();

      if (res?.accessToken) {
        if (res.role == 'admin') {
          console.log('ADMIN', res.role);

          router.push('/admin');
        } else if (res.role == 'super_admin') {
          router.push('/super_admin');
        } else if (searhParams && res.role == 'user') {
          console.log(res.role);
          router.push(`${searhParams}`);
        } else {
          console.log('ADMIN', res.role);
          router.push('/');
        }
        message.success('User logged in successfully!');
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      message.error(err?.data?.message || 'Network Error');
    }
  };

  // const githubHandler = () => {
  //   signIn('github', {
  //     call: 'http://localhost:3000/',
  //   });
  //   // sessionStorage.removeItem('previousPage');
  // };
  const githubHandler = async () => {
    await signIn('github');

    // if (status === 'authenticated' && session) {
    //   // Send session data to RTK query
    //   const res = await oAuthAccess({
    //     email: session?.user?.email,
    //     provider: true,
    //   }).unwrap();
    //   if (res?.accessToken) {
    //     if (res.role == 'admin') {
    //       console.log('ADMIN', res.role);

    //       router.push('/admin');
    //     } else if (res.role == 'super_admin') {
    //       router.push('/super_admin');
    //     } else if (searhParams && res.role == 'user') {
    //       console.log(res.role);
    //       router.push(`${searhParams}`);
    //     } else {
    //       console.log('ADMIN', res.role);
    //       router.push('/');
    //     }
    //     message.success('User logged in successfully!');
    //     storeUserInfo({ accessToken: res?.accessToken });
    //   }
    //   // console.log('session', session);
    //   // console.log(res);
    // }
  };
  console.log('status is', status);

  // if (status === 'authenticated' && session) {
  //   console.log('YOOOOOOOOOOO 6546464646 ');

  //   // Send session data to RTK query
  //   const res = await oAuthAccess({
  //     email: session?.user?.email,
  //     provider: true,
  //   }).unwrap();
  //   await storeUserInfo({ accessToken: res?.accessToken });
  //   console.log('RESSSSSSSSSSSSSSS', res);
  //   console.log('STAAAAAAAAAA', status, session);

  //   if (res?.accessToken) {
  //     if (res.role == 'admin') {
  //       console.log('ADMIN', res.role);

  //       router.push('/admin');
  //     } else if (res.role == 'super_admin') {
  //       router.push('/super_admin');
  //     } else if (searhParams && res.role == 'user') {
  //       console.log(res.role);
  //       router.push(`${searhParams}`);
  //     } else {
  //       console.log('ADMIN', res.role);
  //       router.push('/');
  //     }
  //     message.success('User logged in successfully!');
  //     storeUserInfo({ accessToken: res?.accessToken });
  //   }
  //   console.log('google  session', session);
  //   console.log('google  session', res);
  // }

  const googleHandler = async () => {
    const res = await signIn('google');

    if (res?.ok && data) {
      console.log('DATA', data);
    }
    console.log('RESSS', res);

    // if (status === 'authenticated' && session) {
    //   console.log('YOOOOOOOOOOO 6546464646 ', status);

    //   // Send session data to RTK query
    //   const res = await oAuthAccess({
    //     email: session?.user?.email,
    //     provider: true,
    //   }).unwrap();
    //   console.log('RESSSSSSSSSSSSSSS', res);

    //   storeUserInfo({ accessToken: res?.accessToken });
    //   console.log('STAAAAAAAAAA', status, session);

    //   if (res?.accessToken) {
    //     console.log('access token have', res?.accessToken);

    //     if (res.role == 'admin') {
    //       console.log('ADMIN', res.role);

    //       router.push('/admin');
    //     } else if (res.role == 'super_admin') {
    //       router.push('/super_admin');
    //     } else if (searhParams && res.role == 'user') {
    //       console.log(res.role);
    //       router.push(`${searhParams}`);
    //     } else {
    //       console.log('ADMIN', res.role);
    //       router.push('/');
    //     }
    //     message.success('User logged in successfully!');
    //     storeUserInfo({ accessToken: res?.accessToken });
    //   }
    //   console.log('google  session', session);
    //   console.log('google  session', res);
    // }
  };

  // useEffect(() => {
  //   if (status === 'authenticated' && session) {
  //     // Send session data to RTK query
  //     const res = oAuthAccess({
  //       email: session?.user?.email,
  //       provider: true,
  //     }).unwrap();
  //     storeUserInfo({ accessToken: res?.accessToken });
  //   }
  // }, []);

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

            <div className='text-right no-underline'>
              <Link
                className='no-underline text-base text-blue-600'
                href='/forgot-password'
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              htmlType='submit'
              size='large'
              className=' block bg-[#274279] mt-8    text-white    rounded-md  px-6 '
            >
              Login
            </Button>
          </Form>

          <Divider className='mt-6 font-medium text-lg' plain>
            or
          </Divider>
          <div className='flex justify-center space-x-4 text-3xl text-[#274279]'>
            <GithubOutlined onClick={githubHandler} />
            <GoogleOutlined onClick={googleHandler} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
