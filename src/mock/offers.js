
const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 't1',
        'title': 'Слушать свою музыку',
        'price': 36
      },
      {
        'id': 't2',
        'title': 'Не пристегиваться',
        'price': 128
      },
      {
        'id': 't3',
        'title': 'Кричать в окно ',
        'price': 169
      },
      {
        'id': 't4',
        'title': 'Выпитьвать в машине',
        'price': 57
      },
      {
        'id': 't5',
        'title': 'Поменяться с водителем местами',
        'price': 470
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 's1',
        'title': 'Choose meal',
        'price': 191
      },
      {
        'id': 's2',
        'title': 'Choose seats',
        'price': 78
      },
      {
        'id': 's3',
        'title': 'Upgrade to comfort class',
        'price': 95
      },
      {
        'id': 's4',
        'title': 'Upgrade to business class',
        'price': 84
      },
      {
        'id': 's5',
        'title': 'Add luggage',
        'price': 98
      },
      {
        'id': 's6',
        'title': 'Business lounge',
        'price': 175
      }
    ]
  },
];

const getMockOffers = () => mockOffers;

export {getMockOffers};
