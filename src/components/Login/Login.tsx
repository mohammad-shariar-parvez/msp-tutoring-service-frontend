'use client';
import { Alert, Button, Divider, Tag, message, Typography } from 'antd';
import loginImage from '../../assets/login.png';
import Image from 'next/image';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/login';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
const { Paragraph } = Typography;
type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const searhParams = useSearchParams().get('redirect') as string;
  const [loadings, setLoadings] = useState<boolean>(false);
  const callbackUrl = searhParams
    ? searhParams
    : 'https://msp-tutoring-service.vercel.app/';
  // const callbackUrl = searhParams ? searhParams : 'http://localhost:3000/';

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    setLoadings(true);
    try {
      const result = await signIn('msp-tutoring-signin', {
        email: data.email,
        password: data.password,
        redirect: false,
        // callbackUrl: "/",
      });

      if (result?.ok && !result.error) {
        setLoadings(false);
        message.success('User Logged in  successfully!');
        router.refresh();
        router.push(callbackUrl, { scroll: false });
      } else {
        setLoadings(false);
        message.error('Password is incorrect!');
      }
    } catch (err: any) {
      setLoadings(false);
      console.log('looogin in error', err);

      message.error(err?.data?.message || 'Something went wrong');
    }
  };

  const githubHandler = async () => {
    await signIn('github', {
      callbackUrl: callbackUrl || 'https://msp-tutoring-service.vercel.app/',
    });
  };
  const googleHandler = async () => {
    await signIn('google', {
      callbackUrl: callbackUrl || 'https://msp-tutoring-service.vercel.app/',
    });
  };

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
              <div className='bg-[#EAEAEA] mb-4 rounded-md p-2 '>
                <Paragraph className='text-sm mb-[6px] select-all' copyable>
                  superadmin@example.com
                </Paragraph>

                <Paragraph className='text-sm mb-[6px] select-all' copyable>
                  admin@example.com
                </Paragraph>
                <Paragraph className=' text-sm mb-[6px] select-all' copyable>
                  user@example.com
                </Paragraph>
                <span className='text-sm font-medium'>password:</span>
                <Paragraph
                  className=' text-sm mb-1 select-all inline-block ms-2'
                  copyable
                >
                  123456
                </Paragraph>
              </div>
              <label className='font-semibold text-base text-[#565656] mb-4'>
                Email
              </label>

              <FormInput
                name='email'
                type='email'
                size='large'
                required
                inputFont='font-normal'
              />
            </div>
            <div className='mb-4 space-y-2 '>
              <label className='font-semibold text-base text-[#565656] mb-4'>
                Password
              </label>

              <FormInput
                name='password'
                type='password'
                size='large'
                inputFont='font-normal'
                required
              />
            </div>

            <div className='text-right no-underline '>
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
              loading={loadings}
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
