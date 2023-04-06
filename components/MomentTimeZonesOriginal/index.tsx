import React, { useState } from 'react';
import moment from 'moment-timezone';

const TimezoneConverter = () => {
  const [selectedTime, setSelectedTime] = useState<moment.Moment>(moment()); // Selected time in local timezone
  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/New_York'); // Timezone to convert to

  // Handle changes to the selected time
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(moment(event.target.value));
  };

  // Handle changes to the selected timezone
  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimezone(event.target.value);
  };

  // Convert the selected time to the selected timezone
  const convertedTime = selectedTime.tz(selectedTimezone);

  return (
    <div>
      <div>
        <label htmlFor='selected-time'>Selected Time:</label>
        <input
          type='datetime-local'
          id='selected-time'
          value={selectedTime.format('YYYY-MM-DDTHH:mm')}
          onChange={handleTimeChange}
        />
      </div>
      <div>
        <label htmlFor='selected-timezone'>Selected Timezone:</label>
        <select id='selected-timezone' value={selectedTimezone} onChange={handleTimezoneChange}>
          <option value='America/New_York'>America/New_York</option>
          <option value='Europe/London'>Europe/London</option>
          <option value='Asia/Tokyo'>Asia/Tokyo</option>
        </select>
      </div>
      <div>
        <p>Converted Time: {convertedTime.format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
    </div>
  );
};

export default TimezoneConverter;
