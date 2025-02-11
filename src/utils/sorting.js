import { SortType } from '../const';
import dayjs from 'dayjs';

const getPointsDateDifference = (points) => points.toSorted((pointFirst, pointSecond) => dayjs(pointFirst.dateFrom).diff(dayjs(pointSecond.dateFrom)));
const getByPriceDescending = (points) => points.toSorted((pointFirst, pointSecond) =>pointSecond.basePrice - pointFirst.basePrice);
const getPointsDurationDifference = (points) => points.toSorted((pointFirst, pointSecond) => dayjs(pointSecond.dateTo).diff(dayjs(pointSecond.dateFrom)) - dayjs(pointFirst.dateTo).diff(dayjs(pointFirst.dateFrom)));

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

