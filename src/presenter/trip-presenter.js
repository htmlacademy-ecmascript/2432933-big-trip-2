import { eventsContainerElement } from '../elements.js';
import { render } from '../framework/render.js';
import SortEventsView from '../view/sort-events-view.js';
import EventPointsPresenter from './event-points-presenter.js';
import FilterPresenter from './filter-presenter.js';

export default class TripPresenter {
  #eventModel = {};
  #container = eventsContainerElement; // ???
  #eventList = null;
  #points = [];
  #offers = [];
  #destinations = null;
  #filters = [];

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
  }

  init() {
    this.#points = this.#eventModel.allPoints;
    this.#offers = this.#eventModel.allOffers;
    this.#destinations = this.#eventModel.allDestinations;

    this.#renderSortingAndFilters();

    this.#renderEventList(this.#points, this.#offers, this.#destinations, this.#container);
    this.#renderFilters(this.#points);
  }

  #renderSortingAndFilters() {
    render(new SortEventsView(), eventsContainerElement);
  }

  #renderEventList(points, offers, destinations, container){
    this.#eventList = new EventPointsPresenter(points, offers, destinations, container);
    this.#eventList.init();
  }

  #renderFilters(points){
    this.#filters = new FilterPresenter(points);
    this.#filters.init();
  }
}


