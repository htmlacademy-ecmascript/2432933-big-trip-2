import { eventsContainerElement, newPointButtonElement } from '../elements.js';
import { UserAction, UpdateType, DEFAULT_SORT_TYPE, DEFAULT_FILTER_TYPE, FilterType } from '../const.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { sortItems, getSortTypes } from '../utils/sorting.js';
import SortEventsView from '../view/sort-events-view.js';
import PreloadMessageView from '../view/preload-message-view.js';
import ListPointsPresenter from './list-points-presenter.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

//import NoPointsView from '../view/no-points-view.js'; // добавить сообщение
import { filterPoints } from '../mock/filter.js';

export default class TripPresenter {
  #eventModel = {};
  #filtersModel = {};
  #loadingComponent = new PreloadMessageView('Loading...');
  #fatalComponent = new PreloadMessageView('Failed to load latest route information');
  #isLoading = true;
  #isFailed = false;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #listPointsPresenter = null;
  #tripSortComponent = null;
  #currentSortType = DEFAULT_SORT_TYPE;
  #currentFilterType = DEFAULT_FILTER_TYPE;

  constructor({ eventModel, filtersModel}) {
    this.#eventModel = eventModel;
    this.#filtersModel = filtersModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderPointsList();
    this.#renderNewPoint();
    this.#renderTrip();
    this.#createNewPoint();
  }

  get pointsAll(){
    this.#currentFilterType = this.#filtersModel.currentFilter;
    const points = this.#eventModel.allPoints;
    const filteredPoints = filterPoints(points, this.#currentFilterType);

    return sortItems(this.#currentSortType, filteredPoints);
  }

  get #offersAll() {
    return this.#eventModel.allOffers;
  }

  get #destinationsAll(){
    return this.#eventModel.allDestinations;
  }

  #renderPointsList(){ // LIST
    this.#listPointsPresenter = new ListPointsPresenter({
      pointPresenter    : this.#pointPresenter,
      handleViewAction  : this.#handleViewAction,
      onFormMode : this.#handleNewFormMode,
    });
    this.#listPointsPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, eventsContainerElement ,RenderPosition.AFTERBEGIN);
  }

  #renderFatal() {
    render(this.#fatalComponent, eventsContainerElement ,RenderPosition.AFTERBEGIN);
  }

  #handleNewFormMode = () => {
    if (!this.#newPointPresenter.mode){
      return;
    }
    this.#newPointPresenter.destroy();
  };

  #renderNewPoint(){
    this.#newPointPresenter = new NewPointPresenter({
      offers       : this.#offersAll,
      destinations : this.#destinationsAll,
      onDataChange : this.#handleViewAction,
    });
  }

  #createNewPoint(){
    newPointButtonElement.addEventListener('click', this.#handleNewPointButtonClick);
  }

  #handleNewPointButtonClick = () => {
    this.#currentSortType = DEFAULT_SORT_TYPE;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    this.#listPointsPresenter.resetCurrentActiveFormId();
  };


  #renderPoints() {
    this.pointsAll.forEach((point) => {
      const pointPresenter = new PointPresenter({
        //container : eventsListElement,
        offers : this.#offersAll,
        destinations : this.#destinationsAll,
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
        remove(this.#loadingComponent);
        this.#renderTrip();
      },
      [UpdateType.FATAL] : () => {
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#isFailed = true;
        this.#renderFatal();
      }
    };
    updateHandlers[updateType]();
  };

  #rerenderTrip(){
    this.#clearBoard();
    this.#renderTrip();
  }


  #handleViewAction = (actionType, updateType, update) => {
    if(!actionType){
      return;
    }

    const action = {
      [UserAction.UPDATE_POINT] : () => this.#eventModel.updatePoint(updateType, update),
      [UserAction.ADD_POINT]    : () => this.#eventModel.addPoint(updateType, update),
      [UserAction.DELETE_POINT] : () => this.#eventModel.deletePoint(updateType, update),
    };

    action[actionType]();
  };


  #clearBoard(){
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    this.#listPointsPresenter.resetCurrentActiveFormId();

    remove(this.#tripSortComponent);
  }

  #renderTrip(){
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

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

}

