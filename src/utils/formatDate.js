import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getEventDate = (date, format) => date ? dayjs(date).format(format) : '';

const MSEC_IN_HOUR = 60 * 60 * 1000;
const MSEC_IN_DAY = 24 * MSEC_IN_HOUR;

function getDiffDate(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));

  const formats = [
    { condition : diff >= MSEC_IN_DAY, format: 'D[D] H[H] m[M]' },
    { condition : diff >= MSEC_IN_HOUR, format: 'H[H] m[M]' },
    { condition : true, format: 'm[M]' },
  ];

  const selectedFormat = formats.find(({ condition }) => condition).format;
  return dayjs.duration(diff).format(selectedFormat);
}

export {getEventDate, getDiffDate, };
