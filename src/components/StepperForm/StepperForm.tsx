'use client';

import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import { Button, ConfigProvider, message, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepsProps {
  steps: ISteps[];
  persistKey: string;
  submitHandler: (el: any) => void;
  navigateLink?: string;
}

const StepperForm = ({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}: IStepsProps) => {
  const router = useRouter();

  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage('step')
      ? Number(JSON.parse(getFromLocalStorage('step') as string).step)
      : 0
  );
  // console.log(current);

  const [savedValues, setSavedValues] = useState(
    !!getFromLocalStorage(persistKey)
      ? JSON.parse(getFromLocalStorage(persistKey) as string)
      : ''
  );

  useEffect(() => {
    setToLocalStorage('step', JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  // console.log(steps);

  const items = steps.map((item) => ({ key: item.title, ...item }));
  // console.log(items);

  const methods = useForm({ defaultValues: savedValues });
  const watch = methods.watch();

  useEffect(() => {
    // console.log(JSON.stringify(watch));

    setToLocalStorage(persistKey, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset();
    setToLocalStorage('step', JSON.stringify({ step: 0 }));
    setToLocalStorage(persistKey, JSON.stringify({}));
    setCurrent(0);
    // navigateLink && router.push(navigateLink);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Steps: {
              colorPrimary: '#274279',

              /* here is your component tokens */
            },
          },
        }}
      >
        <Steps current={current} items={items} />
      </ConfigProvider>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)}>
          <div className='py-4'>{steps[current].content}</div>
          <div className=' space-x-4'>
            {current < steps.length - 1 && (
              <Button
                className='bg-button-primary  text-white '
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current > 0 && (
              <Button
                className='bg-button-primary  text-white '
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className='bg-[#274279]  text-white '
                htmlType='submit'
                onClick={() => message.success('Processing complete!')}
              >
                Done
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
