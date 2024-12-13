import { getRandomPoints } from '../mock/point.js';
import { getMockOffers } from '../mock/offers.js';
import {getMockDestinations} from '../mock/destinations.js';

export default class EventModel {
  #offers = getMockOffers();
  #points = getRandomPoints();
  #destinations = getMockDestinations();

  get retrieveAllData() {
    return {
      points       :  [...this.#points],
      offers       :  [...this.#offers],
      destinations :  [...this.#destinations],
    };
  }
}
