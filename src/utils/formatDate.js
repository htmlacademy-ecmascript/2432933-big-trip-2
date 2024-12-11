import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(utc);

const getEventDate = (date, format) => date ? dayjs.utc(date).format(format) : '';

const getDiffDate = (startDate, endDate) => {
  const diffDuration = dayjs.duration(dayjs(endDate).diff(dayjs(startDate)));

  const timeUnits = [
    { value : diffDuration.days(), unit    : 'D' },
    { value : diffDuration.hours(), unit   : 'H' },
    { value : diffDuration.minutes(), unit : 'M' },
  ];

  const result = timeUnits.reduce((accumulator, {value, unit}) => value > 0 ? `${accumulator}${value}${unit} ` : '', '');
  return result.trim();
};

export {getEventDate, getDiffDate, };
