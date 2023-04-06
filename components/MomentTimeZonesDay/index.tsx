import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import options from '../TimeZonesReal/tmz_formatted.json';

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(defaultTimezone);

const browserTime = dayjs().format('YYYY-MM-DDTHH:mm');

const TimezoneConverterDayJS = () => {
  const [time, setTime] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [timeZone, setTimeZone] = useState<string>(
    options.find((option) => option.key === defaultTimezone)?.value ?? 'America/New_York'
  );

  // Handle changes to the selected time
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  // Handle changes to the selected timezone
  const handleTimezoneChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentIdx = event.target.selectedIndex;
    setTimeZone(event.target.value);

    const curTime = dayjs(browserTime).format('YYYY-MM-DDTHH:mm');
    const targetTime = dayjs(browserTime).tz(options[currentIdx].key).format('YYYY-MM-DDTHH:mm');

    const differenceInHours = dayjs(targetTime).diff(dayjs(curTime), 'hour');

    const timeObj = dayjs(curTime).tz(defaultTimezone);
    const newTimeObj = timeObj.add(differenceInHours, 'hour');

    setTime(newTimeObj.format('YYYY-MM-DDTHH:mm'));
  }, []);

  return (
    <div style={{ padding: '3%' }}>
      <div>
        <label htmlFor='selected-time'>Time:</label>
        <input type='datetime-local' id='selected-time' value={time} onChange={handleTimeChange} />
      </div>

      <div style={{ marginTop: '3%' }}>
        <label htmlFor='selected-timezone'>Timezone:</label>
        <select id='selected-timezone' value={timeZone} onChange={handleTimezoneChange}>
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
