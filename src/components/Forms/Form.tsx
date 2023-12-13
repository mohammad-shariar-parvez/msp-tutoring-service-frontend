'use client';

import { ReactElement, ReactNode, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
  noReset?: boolean;
};

type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
  noReset = true,
}: FormProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig['defaultValues'] = defaultValues;
  if (!!resolver) formConfig['resolver'] = resolver;
  const methods = useForm<FormProps>(formConfig);

  const { handleSubmit, reset } = methods;
  const watch = methods.watch();

  // console.log(watch);

  const onSubmit = (data: any) => {
    submitHandler(data);
    if (noReset) {
      reset();
    }
  };

  useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
