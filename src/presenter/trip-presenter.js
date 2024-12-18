import { eventsContainerElement, tripControlsElement } from '../const';
import { render} from '../framework/render';
import SortEvents from '../view/sort-events';
import FilterEvents from '../view/filters-events';
import EventPoints from './event-points';

export default class TripPresenter {
  #eventModel = {};
  container = eventsContainerElement;
  #eventList = null;
  #points = null;
  #offers = null;
  #destinations = null;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
  }

  init() {
    this.#points = this.#eventModel.allPoints;
    this.#offers = this.#eventModel.allOffers;
    this.#destinations = this.#eventModel.allDestinations;

    this.#renderSortingAndFilters();

    this.#eventList = new EventPoints(this.#points, this.#offers, this.#destinations);
    this.#eventList.init();
  }

  #renderSortingAndFilters() {
    render(new SortEvents(), eventsContainerElement);
    render(new FilterEvents(), tripControlsElement);
  }
}


