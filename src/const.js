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
  GET    : 'GET',
  PUT    : 'PUT',
  POST   : 'POST',
  DELETE : 'DELETE',
};

const BLANK_POINT = {
  destination: '',
  isFavorite: false,
  offers: [],
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  type: 'flight'
};

const Mode = {
  DEFAULT : 'default',
  EDIT    : 'edit'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const MessageNoPoints = {
  past    : 'There are no past events now',
  future  : 'There are no future events now',
  present : 'There are no present events now',
  default : 'Click New Event to create your first point',
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
  Method,
  BLANK_POINT,
  Mode,
  TimeLimit,
  MessageNoPoints
};
