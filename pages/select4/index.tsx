import dynamic from 'next/dynamic';

const DayJs = dynamic(() => import('../../components/MomentTimeZonesDay'), { ssr: false });

const index = () => {
  return <DayJs />;
};

export default index;
