
const mockDataPoints = [
  {
    id: 'f1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
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
    dateFrom: '2019-07-13T22:55:56.845Z',
    dateTo: '2019-07-15T11:22:13.375Z',
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
    dateFrom: '2019-07-13T22:55:56.845Z',
    dateTo: '2019-07-15T11:22:13.375Z',
    destination: 'fe2',
    isFavorite: false,
    offers: [],
    type: 'flight'
  }
];

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function getRandomTask() {
  return getRandomArrayElement(mockDataPoints);
}


export { getRandomTask };
