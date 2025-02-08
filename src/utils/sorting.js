import { SortType } from '../const';
import dayjs from 'dayjs';

const getPointsDateDifference = (points) => points.toSorted((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
const getByPriceDescending = (points) => points.toSorted((a, b) => b.basePrice - a.basePrice);
const getPointsDurationDifference = (points) => points.toSorted((a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom)));

const sorting = {
  [SortType.DAY]   : (points) => getPointsDateDifference(points),
  [SortType.PRICE] : (points) => getByPriceDescending(points),
  [SortType.TIME]  : (points) => getPointsDurationDifference(points),
};

const sortItems = (currentType, items) => sorting[currentType](items);

const SortTypeDisabled = {
  [SortType.DAY]    : false,
  [SortType.EVENT]  : true,
  [SortType.TIME]   : false,
  [SortType.PRICE]  : false,
  [SortType.OFFERS] : true
};

const getSortTypes = () =>
  Object.values(SortType)
    .map((type) => ({
      type,
      isDisabled: SortTypeDisabled[type],
    }));

export { sortItems, getSortTypes, getPointsDateDifference};

