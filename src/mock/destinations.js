const mockDestinations = [
  {
    'id': '30f42674-cfa8-428c-928a-051eb5f92001',
    'description': 'Valencia - for those who value comfort and coziness',
    'name': 'Valencia',
    'pictures': []
  },
  {
    'id': '8ab7f907-f123-4067-96e9-ee6c485b33c0',
    'description': 'Chamonix - a true asian pearl',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/13.jpg',
        'description': 'Chamonix with crowded streets'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/12.jpg',
        'description': 'Chamonix a perfect place to stay with a family'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/13.jpg',
        'description': 'Chamonix with a beautiful old town'
      }
    ]
  },
  {
    'id': '428783a7-94ad-493b-809f-8e1dba9f7df9',
    'description': 'Kopenhagen - famous for its crowded street markets with the best street food in Asia',
    'name': 'Kopenhagen',
    'pictures': []
  },
  {
    'id': '38b45534-8ad4-4bab-b827-422293a06810',
    'description': 'Saint Petersburg - with crowded streets',
    'name': 'Saint Petersburg',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        'description': 'Saint Petersburg with an embankment of a mighty river as a centre of attraction'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/12.jpg',
        'description': 'Saint Petersburg for those who value comfort and coziness'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/16.jpg',
        'description': 'Saint Petersburg in a middle of Europe'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        'description': 'Saint Petersburg famous for its crowded street markets with the best street food in Asia'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/19.jpg',
        'description': 'Saint Petersburg with a beautiful old town'
      }
    ]
  },
  {
    'id': 'a750b073-183f-4457-8c91-358a1d72c6c0',
    'description': 'Naples - a true asian pearl',
    'name': 'Naples',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        'description': 'Naples for those who value comfort and coziness'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/13.jpg',
        'description': 'Naples with an embankment of a mighty river as a centre of attraction'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/13.jpg',
        'description': 'Naples famous for its crowded street markets with the best street food in Asia'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/14.jpg',
        'description': 'Naples with crowded streets'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        'description': 'Naples is a beautiful city'
      }
    ]
  },
  {
    'id': 'a2abf34f-1d58-4266-9d3d-348129e42498',
    'description': 'Munich - a perfect place to stay with a family',
    'name': 'Munich',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        'description': 'Munich with an embankment of a mighty river as a centre of attraction'
      }
    ]
  },
  {
    'id': '508fbd28-5e33-49e2-9546-e22809d5e033',
    'description': 'Berlin - a perfect place to stay with a family',
    'name': 'Berlin',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/2.jpg',
        'description': 'Berlin with a beautiful old town'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/17.jpg',
        'description': 'Berlin middle-eastern paradise'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/20.jpg',
        'description': 'Berlin with an embankment of a mighty river as a centre of attraction'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/18.jpg',
        'description': 'Berlin middle-eastern paradise'
      }
    ]
  },
  {
    'id': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'description': 'Tokio - with an embankment of a mighty river as a centre of attraction',
    'name': 'Tokio',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/6.jpg',
        'description': 'Tokio is a beautiful city'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/2.jpg',
        'description': 'Tokio middle-eastern paradise'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/3.jpg',
        'description': 'Tokio a true asian pearl'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/5.jpg',
        'description': 'Tokio middle-eastern paradise'
      }
    ]
  },
  {
    'id': 'fd3bc004-4822-4f32-83f1-a93c0343a736',
    'description': 'Geneva - with an embankment of a mighty river as a centre of attraction',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/8.jpg',
        'description': 'Geneva middle-eastern paradise'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/15.jpg',
        'description': 'Geneva with an embankment of a mighty river as a centre of attraction'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/4.jpg',
        'description': 'Geneva with crowded streets'
      }
    ]
  },
  {
    'id': 'f64c9d2d-f682-4ff9-8412-8a03a02f09b4',
    'description': 'Madrid - a perfect place to stay with a family',
    'name': 'Madrid',
    'pictures': [
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        'description': 'Madrid a perfect place to stay with a family'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/12.jpg',
        'description': 'Madrid with an embankment of a mighty river as a centre of attraction'
      },
      {
        'src': 'https://22.objects.htmlacademy.pro/static/destinations/19.jpg',
        'description': 'Madrid is a beautiful city'
      }
    ]
  }
];

const getMockDestinations = () => mockDestinations;

export { getMockDestinations };
