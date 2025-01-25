import { eventsContainerElement, eventsListElement } from '../elements.js';
import { render, RenderPosition } from '../framework/render.js';
import { DEFAULT_SORT_TYPE } from '../const.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
import SortEventsView from '../view/sort-events-view.js';
import PointsPresenter from './points-presenter.js';
//import FiltersPresenter from './filters-presenter.js';
//import NoPointsView from '../view/no-points-view.js';
import TripEventsList from '../view/trip-events-list-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class TripPresenter {
  #eventModel = {};
  #points = [];
  #offers = [];
  #destinations = null;
  #pointPresenter = new Map();
  #listView = null;
  #tripSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderModel();
    this.tripEventsListInit();
    this.#renderPoints();
  }

  #handleFavorite = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (pointPresenter) {
      pointPresenter.toggleFavorite();
    }
  };

  #handleEditClick = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (pointPresenter) {
      pointPresenter.toggleEditMode();
    }

  };

  tripEventsListInit(){
    this.#listView = new TripEventsList({
      handleFavorite : this.#handleFavorite,
      handleEditClick : this.#handleEditClick,
    });
  }


  #renderPoints() {
    this.#points.forEach((point) => {
      const pointPresenter = new PointsPresenter({
        container : eventsListElement,
        onDataChange : this.#handleViewAction,
      });

      const offers = this.#offers.find((offer) => offer.type === point.type)?.offers || [];
      const eventDestination = this.#destinations.find((destination) => destination.id === point.destination) || {};

      pointPresenter.init(point, offers, eventDestination);
      this.#pointPresenter.set(point.id, pointPresenter);
    });
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#updatePoint(data);
        break;
    }
  };

  #clearBoard(){
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#eventModel.updatePoint(updateType, update);
        break;
    }

  };

  #updatePoint(updatedPoint) {
    const pointPresenter = this.#pointPresenter.get(updatedPoint.id);
    if (pointPresenter) {
      const offers = this.#offers.find((offer) => offer.type === updatedPoint.type)?.offers || [];
      const destination = this.#destinations.find((dest) => dest.id === updatedPoint.destination) || {};
      pointPresenter.update(updatedPoint, offers, destination);
    }
  }

  #renderModel(){
    this.#points = this.#eventModel.allPoints;
    this.#renderSortList();
    this.#offers = this.#eventModel.allOffers;
    this.#destinations = this.#eventModel.allDestinations;
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

    const points = this.#eventModel.allPoints;
    this.#points = sortItems(this.#currentSortType, points);

    this.#clearBoard();
    this.#renderPoints();
  };

}

