import dynamic from 'next/dynamic';

const Day = dynamic(() => import('../../components/Dayjszone'), { ssr: false });

const index = () => {
  return <Day />;
};

export default index;
