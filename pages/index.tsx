import dynamic from 'next/dynamic';

const TimeZoneComponent = dynamic(() => import('../components/TimeZonesReal'), { ssr: false });

const App = () => {
  return <TimeZoneComponent />;
};

export default App;
