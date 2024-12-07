import { eventsContainerElement, tripControlsElement } from '../const';
import { render } from '../render';
import EventItemView from '../view/trip-events-item';
import EventListView from '../view/trip-events-list';
import EditEventView from '../view/edit-form-view';
import PointSortView from '../view/point-sort';
import FilterView from '../view/point-filters';

export default class TripPresenter {
  pointList = new EventListView();
  constructor({boardContainer, pointsModel}){
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init(){
    this.boardPoints = [...this.pointsModel.points];
    this.boardOffers = [...this.pointsModel.offers];
    this.boardDestinations = [...this.pointsModel.destinations];


    render(this.pointList, eventsContainerElement);

    const editPointView = new EditEventView({
      point : this.boardPoints[0],
      offers: this.boardOffers,
      destinations : this.boardDestinations,
    });

    render(editPointView, this.pointList.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      const eventItemView = new EventItemView({
        point: this.boardPoints[i],
        offers: this.boardOffers
      });

      render(eventItemView, this.pointList.getElement());

    }
  }

  getSortPoint(){
    return render(new PointSortView, eventsContainerElement);
  }

  getHeaderComponent(){
    render(new FilterView, tripControlsElement);
  }

}

