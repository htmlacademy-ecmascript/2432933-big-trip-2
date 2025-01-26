import { eventsContainerElement, eventsListElement } from '../elements.js';
import { render, RenderPosition } from '../framework/render.js';
import { DEFAULT_SORT_TYPE } from '../const.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
import SortEventsView from '../view/sort-events-view.js';
import PointPresenter from './point-presenter.js';
//import FiltersPresenter from './filters-presenter.js';
//import NoPointsView from '../view/no-points-view.js';git
import TripEventsListView from '../view/trip-events-list-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class TripPresenter {
  #eventModel = {};
  #points = [];
  #pointPresenter = new Map();
  #listView = null;
  #tripSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#points = this.#eventModel.allPoints;
    this.tripEventsListInit();
    this.#renderPoints();
    this.#renderSortList();
  }

  #handleFavorite = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (pointPresenter) {
      //const currentPoint = pointPresenter.point;
      console.log('handleFavorite');

      // const updatedPoint = { ...currentPoint, isFavorite: !currentPoint.isFavorite };
      const updatedPoint = pointPresenter.toggleFavorite;
      console.log(updatedPoint);

      this.#handleViewAction(UserAction.UPDATE_TASK, UpdateType.MINOR, updatedPoint);
    }
  };

  #handleEditClick = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (pointPresenter) {
      pointPresenter.toggleEditMode();
    }

  };

  tripEventsListInit(){
    this.#listView = new TripEventsListView({
      handleFavorite : this.#handleFavorite,
      handleEditClick : this.#handleEditClick,
    });
  }


  #renderPoints() {
    this.#points.forEach((point) => {
      const offers = this.#eventModel.getOffers(point);
      const eventDestination = this.#eventModel.getDestination(point);

      const pointPresenter = new PointPresenter({
        container : eventsListElement,
        offers : offers,
        destinations : eventDestination
        //onDataChange : this.#handleViewAction,
      });

      /* const offers = this.#eventModel.getOffers(point);
      const eventDestination = this.#eventModel.getDestination(point); */

      pointPresenter.init(point);
      console.log('renderPoints' , point);

      this.#pointPresenter.set(point.id, pointPresenter);
    });
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MINOR:
        console.log('handleModelEvent', data.id);
        this.#pointPresenter.get(data.id).init(data);
        break;

      case UpdateType.MAJOR:
        console.log('test', updateType);
        break;
    }
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#eventModel.updatePoint(updateType, update);
        break;
    }

  };



  #clearBoard(){
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
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

