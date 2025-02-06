import dayjs from 'dayjs';
import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING] : (points) => points,
  [FilterType.FUTURE]     : (points) => points.filter((point) => dayjs().isBefore(point.dateFrom)),
  [FilterType.PRESENT]    : (points) => points.filter((point) => dayjs().isBefore(point.dateFrom) && dayjs().isAfter(point.dateTo)),
  [FilterType.PAST]       : (points) => points.filter((point) => dayjs().isAfter(point.dateTo)),
};

const filterPoints = (points, filterType) => filter[filterType](points);

const generateFilters = (points) => Object.entries(filter).map(
  ([filterType, count]) => ({
    type  : filterType,
    count : count(points).length,
  })
);

export { generateFilters, filterPoints };
