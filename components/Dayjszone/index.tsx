import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DayJSZone = () => {
  console.log('-- before: dayjs().format()', dayjs().format());
  console.log('-- before: dayjs().tz().format()', dayjs().tz().format());

  dayjs.tz.setDefault('America/New_York');

  console.log('-- after: dayjs().format()', dayjs().format());
  console.log('-- after: dayjs().tz().format()', dayjs().tz().format());

  return (
    <div>
      <h1>Hello Day JS</h1>
    </div>
  );
};

export default DayJSZone;
