import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import options from '../TimeZonesReal/tmz_formatted.json';

dayjs.extend(utc);
dayjs.extend(timezone);

const TimezoneConverterDayJS = () => {
  const [selectedTime, setSelectedTime] = useState(
    dayjs().tz().format('YYYY-MM-DDThh:mm').toString()
  );
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const [selectedTimezone, setSelectedTimezone] = useState<string>(options[currentIdx].value); // Timezone to convert to

  useEffect(() => {
    console.log('-- selectedTime changed:', selectedTime);
  }, [selectedTime]);

  // Handle changes to the selected time
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(dayjs(event.target.value).tz().format('YYYY-MM-DDThh:mm'));
  };

  // Handle changes to the selected timezone
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentIdx = event.target.selectedIndex;

    dayjs.tz.setDefault(options[currentIdx].key);

    setSelectedTimezone(event.target.value);
    setSelectedTime(dayjs().tz().format('YYYY-MM-DDThh:mm'));
    setCurrentIdx(currentIdx);
  };

  return (
    <div>
      <div>
        <label htmlFor='selected-time'>Selected Time:</label>
        <input
          type='datetime-local'
          id='selected-time'
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </div>

      <div>
        <label htmlFor='selected-timezone'>Selected Timezone:</label>
        <select id='selected-timezone' value={selectedTimezone} onChange={handleTimezoneChange}>
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimezoneConverterDayJS;
