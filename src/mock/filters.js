import dayjs from 'dayjs';

const today = dayjs();

const isPastDate = (date) => dayjs(date).isBefore(today);

const isPresentDate = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return today.isAfter(start) && today.isBefore(end);
};

const isFutureDate = (date) => dayjs(date).isAfter(today);

const filter = {
  everything: (points) => points,
  future: (points) => points.filter((point) => isFutureDate(point.dateTo)),
  present: (points) => points.filter((point) => isPresentDate(point.dateFrom, point.dateTo)),
  past: (points) => points.filter((point) => isPastDate(point.dateTo)),
};


const generateFilter = (points) =>(Object.entries(filter).map(([filterType, filterPoints]) => (
  {
    type  : filterType,
    count : filterPoints(points).length,
  }
))
);

export { generateFilter };
