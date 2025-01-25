import { getMockPoints } from '../mock/point.js';
import { getMockOffers } from '../mock/offers.js';
import {getMockDestinations} from '../mock/destinations.js';

import Observable from '../framework/observable.js';

export default class EventModel extends Observable{
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

  updatePoint(type, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);
    if (index !== -1) {
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(type, updatedPoint); // Уведомляем подписчиков
      //console.log(this.#points);

    }
  }
}
