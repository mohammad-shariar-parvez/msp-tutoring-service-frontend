'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(0);
  useEffect(() => {
    if (isLoading == 0) {
      setIsLoading(isLoading * 10);
    }
  }, [isLoading]);
  return (
    <div>
      {isLoading}
      <button onClick={() => setIsLoading(0)}> OOOOKAY</button>
    </div>
  );
};

export default Page;
