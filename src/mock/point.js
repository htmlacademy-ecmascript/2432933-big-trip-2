//import { getRandomArrayElement } from '../utils/utils.js';

const mockPoints = [
  {
    id: 'f1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: 'bf5',
    isFavorite: false,
    offers: [
      't1',
      't2',
      't5'
    ],
    type: 'taxi'
  },
  {
    id: 'f2',
    basePrice: 500,
    dateFrom: '2019-07-13T19:30:56.845Z',
    dateTo: '2019-07-14T10:15:13.375Z',
    destination: 'cf2',
    isFavorite: true,
    offers: [
      's1',
      's2',
    ],
    type: 'ship'
  },
  {
    id: 'f3',
    basePrice: 12500,
    dateFrom: '2019-07-13T10:30:00.845Z',
    dateTo: '2019-07-13T11:20:00.375Z',
    destination: 'fe2',
    isFavorite: false,
    offers: [],
    type: 'flight'
  }
];

//const getRandomPoints = () => Array.from({ length: 3 }, () => (mockPoints));
const getMockPoits = () => mockPoints;

export { getMockPoits };
