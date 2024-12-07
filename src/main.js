import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/event-model';
import '../src/view/edit-form-view.js';


const eventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointModel();

const configModel = {
  boardContainer: eventsContainer,
  pointsModel
};

const tripPresenter = new TripPresenter(configModel);

tripPresenter.getHeaderComponent();
tripPresenter.getSortPoint();
tripPresenter.init();
