import AbstractView from '../framework/view/abstract-view.js';
import { createEventsItemTemplate } from './template-view/trip-events-item-view-template.js';

export default class TripEventsItemView extends AbstractView {
  #point = {};
  #offersAll = [];
  #destinations = [];

  constructor({ point, offers, destinations }) {
    super();
    this.#point = point;
    this.#offersAll = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createEventsItemTemplate(this.#point, this.#offersAll, this.#destinations);
  }

}
