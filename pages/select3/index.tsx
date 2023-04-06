import dynamic from 'next/dynamic';

const Moment = dynamic(() => import('../../components/MomentTimeZones'), { ssr: false });

const index = () => {
  return <Moment />;
};

export default index;
