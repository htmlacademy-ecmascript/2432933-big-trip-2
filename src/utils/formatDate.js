import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getEventDate = (date, format) => date ? dayjs(date).format(format) : '';

const getDiffDate = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'milliseconds');
  const dur = dayjs.duration(diff);

  return [
    [Math.floor(dur.asDays()), 'D'],
    [dur.hours(), 'H'],
    [dur.minutes(), 'M']
  ]
    .filter(([value]) => value > 0)
    .map(([value, label]) => `${value}${label}`)
    .join(' ') || '0M';
};

export {getEventDate, getDiffDate, };
