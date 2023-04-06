import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const index = () => {
  const newYorkTime = dayjs().tz('America/New_York');
  const tokyoTime = dayjs().tz('Asia/Tokyo');
  const differenceInHours = newYorkTime.diff(tokyoTime, 'hour');

  console.log('differenceInHours:', differenceInHours);

  const date1 = dayjs('2021-03-13');
  const date2 = dayjs();

  let hours = date2.diff(date1, 'hours');
  const days = Math.floor(hours / 24);
  hours = hours - days * 24;

  console.log('Days: ', days);
  console.log('Hours: ', hours);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default index;
