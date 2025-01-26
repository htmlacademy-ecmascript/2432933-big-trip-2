const mockPoints = [
  {
    'id': '5f9ee412-f87d-46e1-9887-0d961618d0cc',
    'basePrice': 5169,
    'dateFrom': '2025-02-03T20:16:12.191Z',
    'dateTo': '2025-02-04T14:05:12.191Z',
    'destination': '30f42674-cfa8-428c-928a-051eb5f92001',
    'isFavorite': false,
    'offers': ['123423'],
    'type': 'sightseeing'
  },
  {
    'id': '215d04ec-3e66-423e-89d9-ceb8a0ef9cf8',
    'basePrice': 7577,
    'dateFrom': '2025-02-05T09:40:12.191Z',
    'dateTo': '2025-02-07T01:22:12.191Z',
    'destination': 'a750b073-183f-4457-8c91-358a1d72c6c0',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'd22c853d-5f3e-4187-a1ef-1fa3ebde7d66',
    'basePrice': 9544,
    'dateFrom': '2025-02-07T12:59:12.191Z',
    'dateTo': '2025-02-09T02:21:12.191Z',
    'destination': 'f64c9d2d-f682-4ff9-8412-8a03a02f09b4',
    'isFavorite': false,
    'offers': [
      '2a8df86f-b88a-4b3e-9662-25731634857e',
      '3c16359c-9865-4ce2-becd-4277c8661529',
      'dbd5513e-fead-405c-a3d1-e5c6421ebea0',
      '47d98d9a-df0a-4df8-a8a3-a1b3c0dd74be'
    ],
    'type': 'ship'
  },
  {
    'id': 'd6ffe846-36de-4cae-a3a9-04abdf168771',
    'basePrice': 3468,
    'dateFrom': '2025-02-10T08:12:12.191Z',
    'dateTo': '2025-02-10T18:21:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'isFavorite': true,
    'offers': [
      '7ca1faf1-97da-489e-85a5-6171591039fd',
      '0024375c-b547-42d6-ad64-2797b2e18127',
      '5319a082-cf1d-4a30-9f5e-07e735991678'
    ],
    'type': 'taxi'
  },
  {
    'id': '20c88efa-ca36-45ef-962d-795e98f69e27',
    'basePrice': 3367,
    'dateFrom': '2025-02-12T13:29:12.191Z',
    'dateTo': '2025-02-14T00:39:12.191Z',
    'destination': '8ab7f907-f123-4067-96e9-ee6c485b33c0',
    'isFavorite': false,
    'offers': [
      '576a5f71-9edd-4c62-8638-694c4e1aac95',
      '63db7d1a-e8a4-44a8-98ec-a3d170ee4bec',
      '985b7718-dd35-41f2-873b-51f31398f7cd'
    ],
    'type': 'train'
  },
  {
    'id': 'b49af013-5286-4bb0-baa2-aec9448da00b',
    'basePrice': 5269,
    'dateFrom': '2025-02-15T15:41:12.191Z',
    'dateTo': '2025-02-16T00:50:12.191Z',
    'destination': 'fd3bc004-4822-4f32-83f1-a93c0343a736',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'd8301021-e646-4928-b518-1b860ffec519',
    'basePrice': 1518,
    'dateFrom': '2025-02-16T15:15:12.191Z',
    'dateTo': '2025-02-17T08:06:12.191Z',
    'destination': '38b45534-8ad4-4bab-b827-422293a06810',
    'isFavorite': false,
    'offers': [
      '3d7a65d5-53eb-47a9-9876-fac2ef03e362',
      'ad8b5cc9-68aa-4087-bf8d-65765d39b3ab',
      'c85c10dd-cdd5-45b6-9e41-317e3051e7ea',
      '542bf215-535e-48a3-9315-18325ec1035a',
      'ffd571d2-d093-434a-b3ae-302d03508faf',
      '9543ecd2-9a04-4e52-b98b-a00b5020c565'
    ],
    'type': 'flight'
  },
  {
    'id': '58600af0-5167-45f8-96dc-112515073739',
    'basePrice': 8145,
    'dateFrom': '2025-02-19T03:18:12.191Z',
    'dateTo': '2025-02-19T20:07:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'isFavorite': false,
    'offers': [
      '9543ecd2-9a04-4e52-b98b-a00b5020c565'
    ],
    'type': 'flight'
  },
  {
    'id': '9e1fbc18-baa1-458b-8df0-2a6a886af779',
    'basePrice': 4254,
    'dateFrom': '2025-02-20T09:44:12.191Z',
    'dateTo': '2025-02-21T19:26:12.191Z',
    'destination': '38b45534-8ad4-4bab-b827-422293a06810',
    'isFavorite': true,
    'offers': [
      '70b656ad-0317-4cf6-b019-08a4ee227b4a',
      '7ca1faf1-97da-489e-85a5-6171591039fd',
      '0024375c-b547-42d6-ad64-2797b2e18127',
      '5319a082-cf1d-4a30-9f5e-07e735991678'
    ],
    'type': 'taxi'
  },
  {
    'id': '4a3786db-83c9-4e26-ad74-9736160e2720',
    'basePrice': 9049,
    'dateFrom': '2025-02-22T21:53:12.191Z',
    'dateTo': '2025-02-24T20:57:12.191Z',
    'destination': 'f64c9d2d-f682-4ff9-8412-8a03a02f09b4',
    'isFavorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'd66ea8bf-a9de-46c2-ac8d-4b8c88f9302a',
    'basePrice': 1626,
    'dateFrom': '2025-02-26T06:09:12.191Z',
    'dateTo': '2025-02-28T07:07:12.191Z',
    'destination': 'a750b073-183f-4457-8c91-358a1d72c6c0',
    'isFavorite': true,
    'offers': [
      '406a3cc8-313e-4121-a1cc-b7b0e38c8775',
      '2a8df86f-b88a-4b3e-9662-25731634857e',
      '3c16359c-9865-4ce2-becd-4277c8661529',
      'dbd5513e-fead-405c-a3d1-e5c6421ebea0',
      '47d98d9a-df0a-4df8-a8a3-a1b3c0dd74be'
    ],
    'type': 'ship'
  },
  {
    'id': 'adc0a212-e79e-4d81-b8de-94394600b772',
    'basePrice': 6745,
    'dateFrom': '2025-03-01T16:03:12.191Z',
    'dateTo': '2025-03-02T15:56:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'isFavorite': true,
    'offers': [
      '7ca1faf1-97da-489e-85a5-6171591039fd',
      '0024375c-b547-42d6-ad64-2797b2e18127',
      '5319a082-cf1d-4a30-9f5e-07e735991678'
    ],
    'type': 'taxi'
  },
  {
    'id': '042dd32c-7e8b-4f9f-b2ac-9b028a5435de',
    'basePrice': 1655,
    'dateFrom': '2025-03-03T07:54:12.191Z',
    'dateTo': '2025-03-05T08:50:12.191Z',
    'destination': 'fd3bc004-4822-4f32-83f1-a93c0343a736',
    'isFavorite': true,
    'offers': [
      'ffd571d2-d093-434a-b3ae-302d03508faf',
      '9543ecd2-9a04-4e52-b98b-a00b5020c565'
    ],
    'type': 'flight'
  },
  {
    'id': '0189a761-f281-450d-8c46-e4e18b706313',
    'basePrice': 1367,
    'dateFrom': '2025-03-06T23:28:12.191Z',
    'dateTo': '2025-03-09T00:19:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'isFavorite': false,
    'offers': [
      'ac021652-4ce1-44e5-8fff-cd635db2bea8',
      '20ee20be-af90-4d95-ae90-80e814dff5fb',
      '5b51f225-ea2d-44e7-a7f1-08c4b7d9f9d3',
      'd0e3dbc7-4b8e-4d02-aa9e-b9fc30cc411e',
      '228d8b6f-0c99-41a4-b914-214aaf10592e'
    ],
    'type': 'check-in'
  },
  {
    'id': 'd6304abe-abf7-422e-acf4-ca14253d6543',
    'basePrice': 3527,
    'dateFrom': '2025-03-10T08:36:12.191Z',
    'dateTo': '2025-03-10T21:09:12.191Z',
    'destination': 'a750b073-183f-4457-8c91-358a1d72c6c0',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'fd16ae88-4f5f-4485-a0d6-4ced729c46a3',
    'basePrice': 894,
    'dateFrom': '2025-03-12T08:56:12.191Z',
    'dateTo': '2025-03-12T20:17:12.191Z',
    'destination': '508fbd28-5e33-49e2-9546-e22809d5e033',
    'isFavorite': false,
    'offers': [],
    'type': 'train'
  },
  {
    'id': '02397bd4-8484-40d6-8471-a71a7de56408',
    'basePrice': 3371,
    'dateFrom': '2025-03-14T14:12:12.191Z',
    'dateTo': '2025-03-16T08:38:12.191Z',
    'destination': 'fd3bc004-4822-4f32-83f1-a93c0343a736',
    'isFavorite': false,
    'offers': [
      '78cdd6e7-5ea4-449f-92eb-aa947f48f2c6'
    ],
    'type': 'drive'
  },
  {
    'id': '588f276e-0f9f-4276-91a5-0cb9da32d35f',
    'basePrice': 3465,
    'dateFrom': '2025-03-16T22:47:12.191Z',
    'dateTo': '2025-03-17T10:48:12.191Z',
    'destination': '30f42674-cfa8-428c-928a-051eb5f92001',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '7064dbdb-05e9-4a36-b12c-4fdec4890a29',
    'basePrice': 8075,
    'dateFrom': '2025-03-17T16:58:12.191Z',
    'dateTo': '2025-03-18T15:26:12.191Z',
    'destination': 'a750b073-183f-4457-8c91-358a1d72c6c0',
    'isFavorite': true,
    'offers': [
      '70b656ad-0317-4cf6-b019-08a4ee227b4a',
      '7ca1faf1-97da-489e-85a5-6171591039fd',
      '0024375c-b547-42d6-ad64-2797b2e18127',
      '5319a082-cf1d-4a30-9f5e-07e735991678'
    ],
    'type': 'taxi'
  },
  {
    'id': '1e05e53a-14d1-4be2-b1ef-f4d0166d768a',
    'basePrice': 5307,
    'dateFrom': '2025-03-19T01:29:12.191Z',
    'dateTo': '2025-03-19T08:39:12.191Z',
    'destination': '38b45534-8ad4-4bab-b827-422293a06810',
    'isFavorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '0989080a-bafe-4ae8-a94d-efd2c1ccc5f5',
    'basePrice': 4330,
    'dateFrom': '2025-03-21T05:10:12.191Z',
    'dateTo': '2025-03-22T21:56:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'aa4de4cb-0041-40e4-803c-9405632d342d',
    'basePrice': 8475,
    'dateFrom': '2025-03-24T18:37:12.191Z',
    'dateTo': '2025-03-26T07:16:12.191Z',
    'destination': '8ab7f907-f123-4067-96e9-ee6c485b33c0',
    'isFavorite': true,
    'offers': [
      '4917c7bc-affc-4a96-a014-cd063ef67380',
      '406a3cc8-313e-4121-a1cc-b7b0e38c8775',
      '2a8df86f-b88a-4b3e-9662-25731634857e',
      '3c16359c-9865-4ce2-becd-4277c8661529',
      'dbd5513e-fead-405c-a3d1-e5c6421ebea0',
      '47d98d9a-df0a-4df8-a8a3-a1b3c0dd74be'
    ],
    'type': 'ship'
  },
  {
    'id': 'ed891193-5bdb-47cb-a4d3-ce70063445b6',
    'basePrice': 5672,
    'dateFrom': '2025-03-28T05:31:12.191Z',
    'dateTo': '2025-03-29T09:55:12.191Z',
    'destination': 'fd3bc004-4822-4f32-83f1-a93c0343a736',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '799761f9-d69e-43ca-ab44-bf840ceff9df',
    'basePrice': 9406,
    'dateFrom': '2025-03-31T02:42:12.191Z',
    'dateTo': '2025-03-31T17:13:12.191Z',
    'destination': 'a750b073-183f-4457-8c91-358a1d72c6c0',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '7bc83c8e-8e05-44d1-b0d2-0e074db875f9',
    'basePrice': 6054,
    'dateFrom': '2025-04-01T12:33:12.191Z',
    'dateTo': '2025-04-02T16:28:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'isFavorite': false,
    'offers': [],
    'type': 'drive'
  }
];

const mockPoints2 = [
  {
    'isFavorite': false,
    'id': 'd22c853d-5f3e-4187-a1ef-1fa3ebde7d66',
    'basePrice': 544,
    'dateFrom': '2025-02-07T12:59:12.191Z',
    'dateTo': '2025-02-09T02:21:12.191Z',
    'destination': 'f64c9d2d-f682-4ff9-8412-8a03a02f09b4',
    'offers': [
      '2a8df86f-b88a-4b3e-9662-25731634857e',
      '3c16359c-9865-4ce2-becd-4277c8661529',

    ],
    'type': 'ship'
  },
  {
    'isFavorite': false,
    'id': '20c88efa-ca36-45ef-962d-795e98f69e27',
    'basePrice': 1367,
    'dateFrom': '2025-02-12T13:29:12.191Z',
    'dateTo': '2025-02-13T00:39:12.191Z',
    'destination': '8ab7f907-f123-4067-96e9-ee6c485b33c0',
    'offers': [
      '576a5f71-9edd-4c62-8638-694c4e1aac95',
      '63db7d1a-e8a4-44a8-98ec-a3d170ee4bec',
      '985b7718-dd35-41f2-873b-51f31398f7cd'
    ],
    'type': 'train'
  },
  {
    'isFavorite': true,
    'id': 'd6ffe846-36de-4cae-a3a9-04abdf168771',
    'basePrice': 5468,
    'dateFrom': '2025-02-10T08:12:12.191Z',
    'dateTo': '2025-02-12T18:21:12.191Z',
    'destination': '7aea23ac-a75c-4d4b-b476-912893a3c214',
    'offers': [
      '7ca1faf1-97da-489e-85a5-6171591039fd',
      '0024375c-b547-42d6-ad64-2797b2e18127',
      '5319a082-cf1d-4a30-9f5e-07e735991678'
    ],
    'type': 'taxi'
  },

];
const getMockPoints = () => mockPoints2;

export { getMockPoints };
