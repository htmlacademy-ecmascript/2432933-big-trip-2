import { getRandomTask } from '../mock/mock-point-data.js';
import { mockOffers } from '../mock/mock-offers-data.js';
import {mockDestinations} from '../mock/mock-destinations-data.js';

export default class PointModel {
  #offersData = mockOffers;
  #pointData = Array.from({ length: 3 }, getRandomTask);
  #destinationsData = mockDestinations;


  get points() {
    return this.#pointData;
  }

  get offers() {
    return this.#offersData;
  }

  get destinations(){
    return this.#destinationsData;

  }
}
