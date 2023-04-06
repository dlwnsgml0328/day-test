import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import options from '../TimeZonesReal/tmz_formatted.json';

const TimezoneConverter = () => {
  const [selectedTime, setSelectedTime] = useState<moment.Moment>(moment()); // Selected time in local timezone
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const [selectedTimezone, setSelectedTimezone] = useState<string>(options[currentIdx].value); // Timezone to convert to

  useEffect(() => {
    console.log('selectedTime with format:', selectedTime.format('YYYY-MM-DD HH:mm'));
  }, [selectedTime]);

  // Handle changes to the selected time
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value', moment(event.target.value));

    setSelectedTime(moment(event.target.value));
  };

  // Handle changes to the selected timezone
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
    setCurrentIdx(event.target.selectedIndex);
  };

  // Convert the selected time to the selected timezone
  const convertedTime = selectedTime.tz(options[currentIdx].key);

  return (
    <div>
      <div>
        <label htmlFor='selected-time'>Selected Time:</label>
        <input
          type='datetime-local'
          id='selected-time'
          value={selectedTime.format('YYYY-MM-DD HH:mm')}
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
      <div>
        <p>Converted Time: {convertedTime.format('YYYY-MM-DD HH:mm')}</p>
      </div>
    </div>
  );
};

export default TimezoneConverter;
