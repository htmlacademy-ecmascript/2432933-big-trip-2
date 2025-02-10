import { eventsContainerElement, newPointButtonElement } from '../elements.js';
import { UserAction, UpdateType, DEFAULT_SORT_TYPE, DEFAULT_FILTER_TYPE, TimeLimit, MessageNoPoints } from '../const.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
import SortEventsView from '../view/sort-events-view.js';
import TripInfoPresenter from './trip-info-presenter.js';
import ListPointsPresenter from './list-points-presenter.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { filterPoints } from '../utils/filter.js';
import MessagePresenter from '../presenter/message-presenter.js';

export default class TripPresenter {
  #eventModel = {};
  #filtersModel = {};
  #isLoading = true;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #listPointsPresenter = null;
  #tripSortComponent = null;
  #tripInfoPresenter = null;

  #currentSortType = DEFAULT_SORT_TYPE;
  #currentFilterType = DEFAULT_FILTER_TYPE;

  #listContainer = null;

  #messageComponent = new MessagePresenter(eventsContainerElement);
  #uiBlocker = new UiBlocker({
    lowerLimit : TimeLimit.LOWER_LIMIT,
    upperLimit : TimeLimit.UPPER_LIMIT
  });

  constructor({ eventModel, filtersModel }) {
    this.#eventModel = eventModel;
    this.#filtersModel = filtersModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#onCreateNewPointClick();
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

  init() {
    this.#renderPointsList();
    this.#renderTrip();
  }

  #renderTrip(){
    this.#messageComponent.clearMessage();
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#getMessageNoPint();
    this.#renderNewPoint();
    this.#renderTripInfo();
    this.#renderSortList();
    this.#renderPoints();
  }

  #rerenderTrip() {
    this.#clearBoard();
    this.#renderTrip();
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

  #renderPoints() {
    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container    : this.#listContainer,
        offers       : this.offers,
        destinations : this.destinations,
        onDataChange : this.#handleViewAction,
      });

      pointPresenter.init(point);
      this.#pointPresenter.set(point.id, pointPresenter);
    });
  }

  #renderNewPoint() {
    this.#newPointPresenter = new NewPointPresenter({
      container        : this.#listContainer,
      offers           : this.offers,
      destinations     : this.destinations,
      onDataChange     : this.#handleViewAction,
      onCheckNoPoints  : this.#getMessageNoPint,
    });
  }

  #renderTripInfo() {
    this.#tripInfoPresenter = new TripInfoPresenter(this.#eventModel);
    this.#tripInfoPresenter.init();
  }

  #renderSortList() {
    this.#tripSortComponent = new SortEventsView({
      sortTypes : getSortTypes(),
      currentSortType : this.#currentSortType,
      onSortTypeChange : this.#handleSortTypeChange,
    });
    render(this.#tripSortComponent, eventsContainerElement, RenderPosition.BEFOREBEGIN);
  }

  #renderLoading() {
    newPointButtonElement.disabled = false;
    this.#messageComponent.newMessage('Loading ...');
  }

  #renderFatal(){
    this.#isLoading = false;
    newPointButtonElement.disabled = true;
    this.#messageComponent.clearMessage();
    this.#messageComponent.newMessage('Failed to load latest route information');
  }

  #clearBoard() {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#tripInfoPresenter !== null) {
      this.#tripInfoPresenter.destroy();
    }

    this.#listPointsPresenter.resetCurrentActiveFormId();
    remove(this.#tripSortComponent);
  }

  #getMessageNoPint = () => {
    if (this.points.length === 0) {
      const message = MessageNoPoints[this.#currentFilterType] || MessageNoPoints.DEFAULT;
      this.#messageComponent.newMessage(message);
      return;
    }
    return '';
  };

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#rerenderTrip();
  };

  #handleCloseNewForm = () => {
    if (!this.#newPointPresenter.mode){
      return;
    }
    this.#newPointPresenter.destroy();
  };

  #onCreateNewPointClick() {
    newPointButtonElement.disabled = true;
    newPointButtonElement.addEventListener('click', this.#handleNewPointButtonClick);
  }

  #handleNewPointButtonClick = () => {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filtersModel.setFilter(UpdateType.MAJOR, DEFAULT_FILTER_TYPE);
    this.#newPointPresenter.init();
    this.#listPointsPresenter.resetCurrentActiveFormId();
    this.#messageComponent.clearMessage();

  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
  };

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
        this.#renderTrip();

      },
      [UpdateType.FATAL] : () => {
        this.#renderFatal();
      }
    };
    updateHandlers[updateType]();
  };

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

}

