import { ApiConfig } from './const.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/event-model';
import FilterModel from './model/filter-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import PointsApiService from './api-server/points-api-service.js';

const eventModel = new EventModel({ pointsApiService : new PointsApiService(ApiConfig.END_POINT, ApiConfig.AUTHORIZATION)});

const filtersModel = new FilterModel();

const filtersPresenter = new FiltersPresenter({ eventModel, filtersModel});
const tripPresenter = new TripPresenter({eventModel, filtersModel});

filtersPresenter.init();
tripPresenter.init();
eventModel.init();
