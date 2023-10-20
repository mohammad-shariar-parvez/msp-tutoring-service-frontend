'use client';
import { Button, Col, Input, Row, message } from 'antd';
import loginImage from '../../assets/login-image.png';
import Image from 'next/image';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { SubmitHandler } from 'react-hook-form';
import {
  useUserLoginMutation,
  useUserSignUpMutation,
} from '@/redux/api/authApi';
import { storeUserInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/schemas/login';
import { signUpSchema } from '@/schemas/signUp';

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
    <Row
      justify='center'
      align='middle'
      style={{
        minHeight: '100vh',
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt='login image' />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: '15px 0px',
          }}
        >
          First SugnUp your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(signUpSchema)}>
            <div>
              <FormInput
                name='email'
                type='email'
                size='large'
                label='Email'
                required
              />
            </div>
            <div
              style={{
                margin: '15px 0px',
              }}
            >
              <FormInput
                name='password'
                type='password'
                size='large'
                label='User Password'
                required
              />
            </div>
            <div
              style={{
                margin: '15px 0px',
              }}
            >
              <FormInput
                name='confirmPassword'
                type='password'
                size='large'
                label='Confirm Password'
                required
              />
            </div>
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignUpPage;
