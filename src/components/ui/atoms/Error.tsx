import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className='flex items-center my-1'>
      <div className='relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full'>
        <span className='block text-sm'>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
