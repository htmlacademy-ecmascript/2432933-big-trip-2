import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/event-model';

const eventModel = new EventModel();

const tripPresenter = new TripPresenter({eventModel});

tripPresenter.init();
