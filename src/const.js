const SortType = {
  DAY    : 'day',
  EVENT  : 'event',
  TIME   : 'time',
  PRICE  : 'price',
  OFFERS : 'offers'
};

const UserAction = {
  UPDATE_POINT : 'UPDATE_POINT',
  ADD_POINT    : 'ADD_POINT',
  DELETE_POINT : 'DELETE_POINT',
};

const UpdateType = {
  PATCH : 'PATCH',
  MINOR : 'MINOR',
  MAJOR : 'MAJOR',
  INIT  : 'INIT',
  FATAL : 'FATAL',
};

const DEFAULT_SORT_TYPE = SortType.DAY;

const configFlatpickr = {
  dateFormat  : 'd/m/y H:i',
  enableTime  : true,
  'time_24hr' : true,
  locale      : { firstDayOfWeek: 1 },
};

const FilterType = {
  EVERYTHING : 'everything',
  FUTURE     : 'future',
  PRESENT    : 'present',
  PAST       : 'past',
};

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const ApiConfig = {
  AUTHORIZATION :'Basic hS2sfS44wcl1saRe33sd3sf',
  END_POINT     : 'https://22.objects.htmlacademy.pro/big-trip',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export {
  SortType,
  DEFAULT_SORT_TYPE,
  UserAction,
  UpdateType,
  configFlatpickr,
  FilterType,
  DEFAULT_FILTER_TYPE,
  ApiConfig,
  Method
};
