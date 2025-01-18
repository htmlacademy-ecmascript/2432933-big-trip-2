import { eventsContainerElement, eventsListElement } from '../elements.js';
import { render, RenderPosition } from '../framework/render.js';
import SortEventsView from '../view/sort-events-view.js';
import EventPointsPresenter from './event-points-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import NoPointsView from '../view/no-points-view.js';


export default class TripPresenter {
  #eventModel = {};
  #points = [];
  #offers = [];
  #destinations = null;
  #pointPresenter = null;
  #filters = [];
  #noPointsComponent = new NoPointsView();

  #tripSortComponent = null;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
  }

  init() {
    this.#renderModel();
    this.#renderFilters(this.#points);

    this.#renderPoints();
  }

  #renderSortList() {
    //  не сделано
    this.#tripSortComponent = new SortEventsView({});
    render(this.#tripSortComponent, eventsContainerElement, RenderPosition.BEFOREBEGIN);
  }

  #renderFilters(points){
    this.#filters = new FiltersPresenter(points);
    this.#filters.init();
  }

  /*   renderPoint(point){
    this.#pointPresenter = new EventPointsPresenter(this.#points, this.#offers, this.#destinations);
    this.#pointPresenter.init(point);
    this.#pointPresenter.initEventList()
  } */

  #renderPoints() {
    this.#pointPresenter = new EventPointsPresenter(this.#points, this.#offers, this.#destinations, eventsListElement);
    this.#points.forEach((point) => this.#pointPresenter.init(point));
    this.#pointPresenter.initEventList();
    //this.#points.forEach((point) => this.renderPoint(point));
  }

  #renderNoPoints (){
    render(this.#noPointsComponent, eventsContainerElement);
  }

  #renderModel(){
    this.#points = this.#eventModel.allPoints;

    if (this.#points.length === 0){
      this.#renderNoPoints();
      return;
    }

    this.#renderSortList();
    this.#offers = this.#eventModel.allOffers;
    this.#destinations = this.#eventModel.allDestinations;
  }
}


