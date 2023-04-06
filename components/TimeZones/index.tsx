import { useState } from 'react';

const timeZones = [
  { value: -720, label: 'GMT-12:00' },
  { value: -660, label: 'GMT-11:00' },
  { value: -600, label: 'GMT-10:00' },
  { value: -540, label: 'GMT-09:00' },
  { value: -480, label: 'GMT-08:00' },
  { value: -420, label: 'GMT-07:00' },
  { value: -360, label: 'GMT-06:00' },
  { value: -300, label: 'GMT-05:00' },
  { value: -240, label: 'GMT-04:00' },
  { value: -180, label: 'GMT-03:00' },
  { value: -120, label: 'GMT-02:00' },
  { value: -60, label: 'GMT-01:00' },
  { value: 0, label: 'GMT+00:00' },
  { value: 60, label: 'GMT+01:00' },
  { value: 120, label: 'GMT+02:00' },
  { value: 180, label: 'GMT+03:00' },
  { value: 240, label: 'GMT+04:00' },
  { value: 300, label: 'GMT+05:00' },
  { value: 360, label: 'GMT+06:00' },
  { value: 420, label: 'GMT+07:00' },
  { value: 480, label: 'GMT+08:00' },
  { value: 540, label: 'GMT+09:00' },
  { value: 600, label: 'GMT+10:00' },
  { value: 660, label: 'GMT+11:00' },
  { value: 720, label: 'GMT+12:00' },
];

function App() {
  const [timeZoneOffset, setTimeZoneOffset] = useState(0);

  return (
    <div>
      <label htmlFor='timezone-select'>Select time zone:</label>
      <select
        id='timezone-select'
        value={timeZoneOffset}
        onChange={(e) => setTimeZoneOffset(Number(e.target.value))}
      >
        {timeZones.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
      <p>
        Current time in GMT {timeZoneOffset >= 0 ? '+' : ''}
        {timeZoneOffset / 60}: {new Date(Date.now() + timeZoneOffset * 60 * 1000).toUTCString()}
      </p>
    </div>
  );
}

export default App;
