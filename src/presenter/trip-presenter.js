import { eventsContainerElement, newPointButtonElement } from '../elements.js';
import { UserAction, UpdateType, DEFAULT_SORT_TYPE, DEFAULT_FILTER_TYPE, TimeLimit } from '../const.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
import SortEventsView from '../view/sort-events-view.js';
import PreloadMessageView from '../view/preload-message-view.js';
import TripInfoPresenter from './trip-info-presenter.js';
import ListPointsPresenter from './list-points-presenter.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { filterPoints } from '../utils/filter.js';

export default class TripPresenter {
  #eventModel = {};
  #filtersModel = {};
  #isLoading = true;
  #isFailed = false;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #listPointsPresenter = null;
  #tripSortComponent = null;
  #tripInfoPresenter = null;

  #currentSortType = DEFAULT_SORT_TYPE;
  #currentFilterType = DEFAULT_FILTER_TYPE;

  #listContainer = null;
  #messageComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit : TimeLimit.LOWER_LIMIT,
    upperLimit : TimeLimit.UPPER_LIMIT
  });

  constructor({ eventModel, filtersModel }) {
    this.#eventModel = eventModel;
    this.#filtersModel = filtersModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#createNewPoint();
    this.#renderPointsList();
    this.#renderTrip();
  }

  get points(){
    this.#currentFilterType = this.#filtersModel.currentFilter;
    const points = this.#eventModel.allPoints;
    const filteredPoints = filterPoints(points, this.#currentFilterType);

    return sortItems(this.#currentSortType, filteredPoints);
  }

  get offers() {
    return this.#eventModel.allOffers;
  }

  get destinations(){
    return this.#eventModel.allDestinations;
  }

  #renderMessage(text) {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }
    this.#messageComponent = new PreloadMessageView(text);
    render(this.#messageComponent, eventsContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList(){
    this.#listPointsPresenter = new ListPointsPresenter({
      container         : eventsContainerElement,
      pointPresenter    : this.#pointPresenter,
      handleViewAction  : this.#handleViewAction,
      manageFormMode    : this.#handleCloseNewForm,
    });
    this.#listContainer = this.#listPointsPresenter.init();
  }

  #clearMessage() {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }
  }

  #renderFatal() {
    this.#clearMessage();
    this.#renderMessage('Failed to load latest route information');
  }

  #handleCloseNewForm = () => {
    if (!this.#newPointPresenter.mode){
      return;
    }
    this.#newPointPresenter.destroy();
  };

  #renderNewPoint(){
    this.#newPointPresenter = new NewPointPresenter({
      container    : this.#listContainer,
      offers       : this.offers,
      destinations : this.destinations,
      onDataChange : this.#handleViewAction,
    });
  }

  #createNewPoint() {
    newPointButtonElement.disabled = true; // где лучше всего блокировать кнопку ? разблокирую на строке 161  ина 167 в случае ошибки блокаирую.
    newPointButtonElement.addEventListener('click', this.#handleNewPointButtonClick); // ну и сам клик. Где лучше всего вешать событие?
  }

  #handleNewPointButtonClick = () => {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filtersModel.setFilter(UpdateType.MAJOR, DEFAULT_FILTER_TYPE);
    this.#newPointPresenter.init();
    this.#listPointsPresenter.resetCurrentActiveFormId();
  };

  #renderPoints() {
    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container : this.#listContainer,
        offers : this.offers,
        destinations : this.destinations,
        onDataChange: this.#handleViewAction,
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
      [UpdateType.PATCH] : () => {
        this.#listPointsPresenter.resetCurrentActiveFormId();
        this.#pointPresenter.get(data.id).init(data);
      },
      [UpdateType.MINOR] : () => {
        this.#rerenderTrip();
      },
      [UpdateType.MAJOR] : () => {
        this.#currentSortType = DEFAULT_SORT_TYPE;
        this.#rerenderTrip();
      },
      [UpdateType.INIT] : () => {
        this.#isLoading = false;
        this.#isFailed = false;
        this.#renderTrip();
        this.#renderNewPoint();
        newPointButtonElement.disabled = false;
      },
      [UpdateType.FATAL] : () => {
        this.#isFailed = true;
        this.#isLoading = false;
        this.#renderFatal();
        newPointButtonElement.disabled = true;
      }
    };
    updateHandlers[updateType]();
  };

  #rerenderTrip(){
    this.#clearBoard();
    this.#renderTrip();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    if(!actionType){
      return;
    }

    const action = {
      [UserAction.UPDATE_POINT] : async () => {
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#eventModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenter.get(update.id).setAborting();
        }
      },
      [UserAction.ADD_POINT] : async () => {
        this.#newPointPresenter.setSaving();

        try {
          await this.#eventModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }

      },
      [UserAction.DELETE_POINT] : async () => {
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#eventModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenter.get(update.id).setAborting();
        }
      },
    };

    try {
      await action[actionType]();
    } finally {
      this.#uiBlocker.unblock();
    }
  };


  #clearBoard(){
    this.#clearMessage();
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#tripInfoPresenter !== null) {
      this.#tripInfoPresenter.destroy();
    }

    this.#listPointsPresenter.resetCurrentActiveFormId();

    remove(this.#tripSortComponent);
  }

  #renderTrip(){
    if (this.#isLoading) {
      this.#renderMessage('Loading ...');
      return;
    }

    if (this.points.length === 0 && !this.#newPointPresenter) {
      this.#renderMessage('Click New Event to create your first point');
      return;
    }

    this.#renderTripInfo();
    this.#renderSortList();
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
    this.#clearBoard();
    this.#renderTrip();
  };

  #renderTripInfo() {
    this.#tripInfoPresenter = new TripInfoPresenter(this.#eventModel);
    this.#tripInfoPresenter.init();
  }

}

