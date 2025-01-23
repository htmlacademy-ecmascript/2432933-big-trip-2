import { eventsContainerElement, eventsListElement } from '../elements.js';
import { render, RenderPosition } from '../framework/render.js';
import { DEFAULT_SORT_TYPE } from '../const.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
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
  #currentSortType = DEFAULT_SORT_TYPE;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
  }

  init() {
    this.#renderModel();
    this.#renderFilters(this.#points);

    this.#renderPoints();
  }

  #renderSortList() {
    this.#tripSortComponent = new SortEventsView({
      sortTypes : getSortTypes(),
      currentSortType : this.#currentSortType,
      onSortTypeChange : this.#handleSortTypeChange,
    });
    render(this.#tripSortComponent, eventsContainerElement, RenderPosition.BEFOREBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;

    this.#points = sortItems(this.#currentSortType, this.#points);

    this.#pointPresenter.destroy(); // ??
    this.#renderPoints();
  };

  #renderFilters(points){
    this.#filters = new FiltersPresenter(points);
    this.#filters.init();
  }

  #renderPoints() {
    this.#pointPresenter = new EventPointsPresenter(this.#points, this.#offers, this.#destinations, eventsListElement, (newPoints) => {
      this.#points = newPoints;
    });

    this.#pointPresenter.initEventList();
    this.#points.forEach((point) => this.#pointPresenter.init(point));
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

