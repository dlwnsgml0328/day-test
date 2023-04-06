import React from 'react';
import dynamic from 'next/dynamic';

const TZ = dynamic(() => import('../../components/TimeZones'), { ssr: false });

const index = () => {
  return <TZ />;
};

export default index;
