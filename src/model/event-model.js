import { getMockPoints } from '../mock/point.js';
import { getMockOffers } from '../mock/offers.js';
import {getMockDestinations} from '../mock/destinations.js';

export default class EventModel {
  #offers = getMockOffers();
  #points = getMockPoints();
  #destinations = getMockDestinations();

  get allPoints() {
    return [...this.#points];
  }

  get allOffers () {
    return [...this.#offers];
  }

  get allDestinations(){
    return [...this.#destinations];
  }
}
