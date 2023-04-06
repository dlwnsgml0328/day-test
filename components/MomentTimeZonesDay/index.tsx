import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import options from '../TimeZonesReal/tmz_formatted.json';

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(defaultTimezone);

const originTimezone = dayjs().format('YYYY-MM-DDTHH:mm');
console.log('originTimezone', originTimezone);

const TimezoneConverterDayJS = () => {
  const [selectedTime, setSelectedTime] = useState(dayjs().format('YYYY-MM-DDTHH:mm'));
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    options.find((option) => option.key === defaultTimezone)?.value ?? 'America/New_York'
  );

  // Handle changes to the selected time
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  // Handle changes to the selected timezone
  const handleTimezoneChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentIdx = event.target.selectedIndex;
    setSelectedTimezone(event.target.value);

    const targetTime = dayjs(originTimezone).tz(options[currentIdx].key).format('YYYY-MM-DDTHH:mm');

    const differenceInHours = dayjs(targetTime).diff(dayjs(originTimezone), 'hour');

    console.log('differenceInHours', differenceInHours);

    const timeObj = dayjs(originTimezone).tz(defaultTimezone);
    const newTimeObj = timeObj.add(differenceInHours, 'hour');

    setSelectedTime(newTimeObj.format('YYYY-MM-DDTHH:mm'));
  }, []);

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

/**
 * const curTime = dayjs(dayjs().tz().format('YYYY-MM-DDTHH:mm'));

    console.log('-- curTime', curTime);

    const utcTime = curTime.utc();

    const target = utcTime.tz(options[currentIdx].key);

    console.log('-- target', target);

    const curHour = curTime.hour();
    const targetHour = target.hour();

    console.log('-- targetHour', targetHour);
    console.log('-- curHour', curHour);

    // 전날로 바뀌어 버리면 계산을 어떻게 해야할까요?
    const differencesInHours = () => {
      if (targetHour > 12) {
        return curHour - targetHour;
      } else {
        return targetHour - curHour;
      }
    };

    console.log('-- differencesInHours', differencesInHours());

    const timeObj = dayjs(selectedTime);

    console.log('-- timeObj', timeObj);

    const newTimeObj = timeObj.add(differencesInHours(), 'hour');

    console.log('-- newTimeObj', newTimeObj.format('YYYY-MM-DDThh:mm'));
 */
