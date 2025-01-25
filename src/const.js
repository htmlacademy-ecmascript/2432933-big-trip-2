const SortType = {
  DAY    : 'day',
  EVENT  : 'event',
  TIME   : 'time',
  PRICE  : 'price',
  OFFERS : 'offers'
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const DEFAULT_SORT_TYPE = SortType.DAY;

export {
  SortType,
  DEFAULT_SORT_TYPE,
  UserAction,
  UpdateType
};
