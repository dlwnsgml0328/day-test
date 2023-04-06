import { ChangeEvent, useMemo, useState } from 'react';
import timeZones from './tmz_formatted.json';
import timeList from './time.json';

// timeZone { "key": "Pacific/Midway", "value": "(GMT-11:00) Midway Island, Samoa", "gmtOffset": -39600 },
// timeList { "key": "00:00", "value": "12.00 AM" },

function App() {
  // time zone
  const [timeZoneOffset, setTimeZoneOffset] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>(
    timeZones.find((tz) => tz.gmtOffset === 0)?.value ?? ''
  );

  // time
  const [currentTime, setCurrentTime] = useState('12.00 AM');
  const [currentTimeView, setCurrentTimeView] = useState('00:00');

  // const calculateOffsetAndChangeCurrentTime = (hour: number) => {
  //   const currentTimeHour = parseInt(currentTimeView.split(':')[0]);

  //   console.log('-- currentTimeHour', currentTimeHour);
  //   console.log('-- hour', hour);

  //   if (currentTimeHour >= 12) {
  //     // PM (12 - 23)
  //     console.log(currentTimeHour + hour);

  //     if (currentTimeHour + hour >= 24) {
  //       console.log(
  //         `${
  //           currentTimeHour + hour - 24 <= 10
  //             ? `0${currentTimeHour + hour - 24}`
  //             : currentTimeHour + hour - 24
  //         }.00 AM`
  //       );
  //       setCurrentTime(
  //         `${
  //           currentTimeHour + hour - 24 <= 10
  //             ? `0${currentTimeHour + hour - 24}`
  //             : currentTimeHour + hour - 24
  //         }.00 AM`
  //       );
  //     } else {
  //       console.log(
  //         `${
  //           currentTimeHour + hour - 24 <= 10
  //             ? `0${currentTimeHour + hour - 24}`
  //             : currentTimeHour + hour - 24
  //         }.00 PM`
  //       );
  //       setCurrentTime(
  //         `${
  //           currentTimeHour + hour - 24 <= 10
  //             ? `0${currentTimeHour + hour - 24}`
  //             : currentTimeHour + hour - 24
  //         }.00 PM`
  //       );
  //     }
  //   } else {
  //     // AM (0 - 11)
  //     console.log(currentTimeHour + hour);

  //     if (currentTimeHour + hour >= 12) {
  //       console.log(
  //         `${
  //           currentTimeHour + hour - 12 <= 10
  //             ? `0${currentTimeHour + hour - 12}`
  //             : currentTimeHour + hour - 12
  //         }.00 PM`
  //       );
  //       setCurrentTime(
  //         `${
  //           currentTimeHour + hour - 12 <= 10
  //             ? `0${currentTimeHour + hour - 12}`
  //             : currentTimeHour + hour - 12
  //         }.00 PM`
  //       );
  //     } else {
  //       console.log(
  //         `${
  //           currentTimeHour + hour <= 10 ? `0${currentTimeHour + hour}` : currentTimeHour + hour
  //         }.00 AM`
  //       );
  //       setCurrentTime(
  //         `${
  //           currentTimeHour + hour <= 10 ? `0${currentTimeHour + hour}` : currentTimeHour + hour
  //         }.00 AM`
  //       );
  //     }
  //   }
  // };

  const handleTimeZoneChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { selectedIndex } = e.target;

    setSelectedOption(timeZones[selectedIndex].value);
    setTimeZoneOffset(timeZones[selectedIndex].gmtOffset / 60);

    // calculateOffsetAndChangeCurrentTime(Math.floor(timeZones[selectedIndex].gmtOffset / 3600));
  };

  const handleTime = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentTime(e.target.value);
    setCurrentTimeView(timeList[e.target.selectedIndex].key);

    const currentTimeHour = parseInt(timeList[e.target.selectedIndex].key.split(':')[0]);

    console.log('currentTimeHour', currentTimeHour);
  };

  const timeZone = useMemo(
    () => new Date(Date.now() + timeZoneOffset * 60 * 1000).toUTCString(),
    [timeZoneOffset]
  );

  return (
    <div style={{ padding: '5%' }}>
      {/* <div>
        <label>Select Date</label>

        <p>
          <input type='datet' />
        </p>
      </div> */}

      <div>
        <label>Select Time: {currentTimeView}</label>

        <p>
          <select value={currentTime} onChange={handleTime}>
            {timeList.map((time) => (
              <option key={time.key} value={time.value}>
                {time.value}
              </option>
            ))}
          </select>
        </p>
      </div>

      <div>
        <label>Select time zone:</label>

        <p>
          <select value={selectedOption} onChange={handleTimeZoneChange}>
            {timeZones.map((tz, idx) => (
              <option key={idx} value={tz.value}>
                {tz.value}
              </option>
            ))}
          </select>
        </p>

        <div>
          <p>
            <span>
              Current time in GMT {timeZoneOffset >= 0 ? '+' : ''}
              {timeZoneOffset / 60}: {timeZone}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
