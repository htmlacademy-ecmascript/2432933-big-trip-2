import { eventsContainerElement, eventsListElement } from '../elements.js';
import { render, RenderPosition } from '../framework/render.js';
import { DEFAULT_SORT_TYPE } from '../const.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
import SortEventsView from '../view/sort-events-view.js';
import PointPresenter from './point-presenter.js';
//import FiltersPresenter from './filters-presenter.js';
//import NoPointsView from '../view/no-points-view.js';git

import { UserAction, UpdateType } from '../const.js';

import ListPresenter from './list-points-presenter.js';

export default class TripPresenter {
  #eventModel = {};
  #points = [];
  #offers = [];
  #destinations = [];

  #pointPresenter = new Map();
  #listView = null;
  #tripSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#getDataEventModel();
    this.#renderPointsList();
    this.#renderPoints();
    this.#renderSortList();
  }

  #getDataEventModel(){
    this.#points = this.#eventModel.allPoints;
    this.#offers = this.#eventModel.allOffers;
    this.#destinations = this.#eventModel.allDestinations;

  }

  #renderPointsList(){
    this.#listView = new ListPresenter({
      pointPresenter: this.#pointPresenter,
      handleViewAction: this.#handleViewAction,
    });
    this.#listView.init();
  }

  #renderPoints() {

    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container : eventsListElement,
        offers : this.#offers,
        /* тут получается я передаю все offers в PointPresenter, который в свою очередь передает во Вью все массивы destinations  и offers.
         получается что все данные массивов со всеми свойтсвами хранится и тут и там. Нормально ли это ? или какой-то коллбэк лучше прокинуть
         что бы дергать данные отсюда или так можно оставить ?  */
        destinations : this.#destinations,
      });

      pointPresenter.init(point);
      this.#pointPresenter.set(point.id, pointPresenter);

    });
  }

  #handleModelEvent = (updateType, data) => {
    if(!updateType){
      return;
    }
    const updateHandlers = {
      [UpdateType.PATCH] : () => this.#pointPresenter.get(data.id).init(data),
      [UpdateType.MINOR] : () => {
        this.#clearBoard();
        this.#renderPoints();
      }

    };

    updateHandlers[updateType]();
  };


  #handleViewAction = (actionType, updateType, update) => {
    if(!actionType){
      return;
    }

    const action = {
      [UserAction.UPDATE_POINT] : () => this.#eventModel.updatePoint(updateType, update),

    };

    action[actionType]();
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

