const SortType = {
  DAY    : 'day',
  EVENT  : 'event',
  TIME   : 'time',
  PRICE  : 'price',
  OFFERS : 'offers'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const DEFAULT_SORT_TYPE = SortType.DAY;

const configFlatpickr = {
  dateFormat  : 'd/m/y H:i',
  enableTime  : true,
  'time_24hr' : true,
  locale      : { firstDayOfWeek: 1 },
};

export {
  SortType,
  DEFAULT_SORT_TYPE,
  UserAction,
  UpdateType,
  configFlatpickr
};
