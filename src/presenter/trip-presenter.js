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

import ListPresenter from './list-presenter.js';

export default class TripPresenter {
  #eventModel = {};
  #points = [];
  #pointPresenter = new Map();
  #listView = null;
  #tripSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #currentActiveFormId = null; // Храним ID текущей активной формы

  constructor({ eventModel }) {
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#points = this.#eventModel.allPoints;
    //this.tripEventsListInit();
    this.test()
    this.#renderPoints();
    this.#renderSortList();
  }

  test(){
    this.#listView = new ListPresenter({
      pointPresenter: this.#pointPresenter,
      handleViewAction: this.#handleViewAction,
    });
    this.#listView.init()
  }

  /* #handleFavorite = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter){
      return;
    }
    console.log('handleFavorite');
    const updatedPoint = pointPresenter.toggleFavorite;
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.PATCH, updatedPoint);
  };

  tripEventsListInit(){
    this.#listView = new TripEventsListView({
      handleFavorite  : this.#handleFavorite,
      handleEditClick : this.#handleOpenFormEdit,
      handleCloseForm : this.#handleCloseFormEdit
    });
  }

  #handleOpenFormEdit = (itemId) => {
    // Закрываем текущую активную форму, если она есть
    if (this.#currentActiveFormId !== null) {
      this.closeForm(this.#currentActiveFormId);
    }

    // Открываем новую форму
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    pointPresenter.toggleEditMode(itemId);
    this.#currentActiveFormId = itemId; // Обновляем ID текущей активной формы
  };

  #handleCloseFormEdit = (itemId) => {
    const pointPresenter = this.#pointPresenter.get(itemId);
    if (!pointPresenter) {
      return;
    }
    console.log('closeForm');
    pointPresenter.closeEditMode(itemId);
    this.#currentActiveFormId = null; // Сбрасываем ID текущей активной формы
  }; */



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
      pointPresenter.init(point);
      //console.log('renderPoints' , point);

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
    console.log('handleModelEvent');

    updateHandlers[updateType]();

  };


  #handleViewAction = (actionType, updateType, update) => {
    console.log('handleViewAction');

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

