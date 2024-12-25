import { eventsContainerElement, tripControlsElement } from '../const.js';
import { render} from '../framework/render.js';
import SortEventsView from '../view/sort-events-view.js';
import FilterEventsView from '../view/filters-events-view.js';
import EventPointsPresenter from './event-points-presenter.js';

export default class TripPresenter {
  #eventModel = {};
  #container = eventsContainerElement; // ???
  #eventList = null;
  #points = [];
  #offers = [];
  #destinations = null;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
  }

  init() {
    this.#points = this.#eventModel.allPoints;
    this.#offers = this.#eventModel.allOffers;
    this.#destinations = this.#eventModel.allDestinations;

    this.#renderSortingAndFilters();

    this.#eventList = new EventPointsPresenter(this.#points, this.#offers, this.#destinations, this.#container);
    this.#eventList.init();
  }

  #renderSortingAndFilters() {
    render(new SortEventsView(), eventsContainerElement);
    render(new FilterEventsView(), tripControlsElement);
  }
}


