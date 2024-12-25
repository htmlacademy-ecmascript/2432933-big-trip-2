
const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '8aae5fc1-ded9-42f1-82a6-36504987440f',
        'title': 'Upgrade to a business class',
        'price': 99
      },
      {
        'id': '70b656ad-0317-4cf6-b019-08a4ee227b4a',
        'title': 'Choose the radio station',
        'price': 64
      },
      {
        'id': '7ca1faf1-97da-489e-85a5-6171591039fd',
        'title': 'Choose temperature',
        'price': 30
      },
      {
        'id': '0024375c-b547-42d6-ad64-2797b2e18127',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 63
      },
      {
        'id': '5319a082-cf1d-4a30-9f5e-07e735991678',
        'title': 'Drive slowly',
        'price': 104
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'c4b207cf-b767-4a0b-93ce-1687a76a37cb',
        'title': 'Infotainment system',
        'price': 183
      },
      {
        'id': 'd92054ed-3441-46f7-beaa-b17782d8273e',
        'title': 'Order meal',
        'price': 155
      },
      {
        'id': '040dfb14-045a-489d-81f9-d3d5e383d610',
        'title': 'Choose seats',
        'price': 186
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '576a5f71-9edd-4c62-8638-694c4e1aac95',
        'title': 'Book a taxi at the arrival point',
        'price': 169
      },
      {
        'id': '63db7d1a-e8a4-44a8-98ec-a3d170ee4bec',
        'title': 'Order a breakfast',
        'price': 34
      },
      {
        'id': '985b7718-dd35-41f2-873b-51f31398f7cd',
        'title': 'Wake up at a certain time',
        'price': 103
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '3d7a65d5-53eb-47a9-9876-fac2ef03e362',
        'title': 'Choose meal',
        'price': 197
      },
      {
        'id': 'ad8b5cc9-68aa-4087-bf8d-65765d39b3ab',
        'title': 'Choose seats',
        'price': 102
      },
      {
        'id': 'c85c10dd-cdd5-45b6-9e41-317e3051e7ea',
        'title': 'Upgrade to comfort class',
        'price': 194
      },
      {
        'id': '542bf215-535e-48a3-9315-18325ec1035a',
        'title': 'Upgrade to business class',
        'price': 108
      },
      {
        'id': 'ffd571d2-d093-434a-b3ae-302d03508faf',
        'title': 'Add luggage',
        'price': 97
      },
      {
        'id': '9543ecd2-9a04-4e52-b98b-a00b5020c565',
        'title': 'Business lounge',
        'price': 174
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 'ac021652-4ce1-44e5-8fff-cd635db2bea8',
        'title': 'Choose the time of check-in',
        'price': 39
      },
      {
        'id': '20ee20be-af90-4d95-ae90-80e814dff5fb',
        'title': 'Choose the time of check-out',
        'price': 53
      },
      {
        'id': '5b51f225-ea2d-44e7-a7f1-08c4b7d9f9d3',
        'title': 'Add breakfast',
        'price': 89
      },
      {
        'id': 'd0e3dbc7-4b8e-4d02-aa9e-b9fc30cc411e',
        'title': 'Laundry',
        'price': 106
      },
      {
        'id': '228d8b6f-0c99-41a4-b914-214aaf10592e',
        'title': 'Order a meal from the restaurant',
        'price': 158
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '4917c7bc-affc-4a96-a014-cd063ef67380',
        'title': 'Choose meal',
        'price': 186
      },
      {
        'id': '406a3cc8-313e-4121-a1cc-b7b0e38c8775',
        'title': 'Choose seats',
        'price': 106
      },
      {
        'id': '2a8df86f-b88a-4b3e-9662-25731634857e',
        'title': 'Upgrade to comfort class',
        'price': 102
      },
      {
        'id': '3c16359c-9865-4ce2-becd-4277c8661529',
        'title': 'Upgrade to business class',
        'price': 121
      },
      {
        'id': 'dbd5513e-fead-405c-a3d1-e5c6421ebea0',
        'title': 'Add luggage',
        'price': 48
      },
      {
        'id': '47d98d9a-df0a-4df8-a8a3-a1b3c0dd74be',
        'title': 'Business lounge',
        'price': 196
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '0a6bb01a-6552-4569-8a54-df1ddf20f8cb',
        'title': 'With automatic transmission',
        'price': 194
      },
      {
        'id': '78cdd6e7-5ea4-449f-92eb-aa947f48f2c6',
        'title': 'With air conditioning',
        'price': 163
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '97eac261-ea54-4400-84c7-7879828798f1',
        'title': 'Choose live music',
        'price': 144
      },
      {
        'id': '6d7b4ca7-5a65-46bc-ac91-67cfad5fd773',
        'title': 'Choose VIP area',
        'price': 136
      }
    ]
  }
];

const getMockOffers = () => mockOffers;

export {getMockOffers};
